from django import forms
from django.contrib.auth import authenticate
from .models import User


class SignupForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    confirm_password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('full_name', 'email', 'password')

    def clean(self):
        cleaned = super().clean()
        p = cleaned.get('password')
        c = cleaned.get('confirm_password')
        if p and c and p != c:
            raise forms.ValidationError('Passwords do not match')
        return cleaned


class LoginForm(forms.Form):
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)

    def clean(self):
        cleaned = super().clean()
        email = cleaned.get('email')
        password = cleaned.get('password')
        if email and password:
            user = authenticate(email=email, password=password)
            if not user:
                raise forms.ValidationError('Invalid credentials')
            cleaned['user'] = user
        return cleaned


class ProfileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('full_name', 'profile_image', 'phone')

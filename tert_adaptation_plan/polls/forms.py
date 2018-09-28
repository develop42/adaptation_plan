from django import forms

class Form(forms.Form):
    input = forms.CharField()
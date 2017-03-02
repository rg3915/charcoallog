from django import forms
from datetime import date
from .models import Extract


class EditExtractForm(forms.Form):
    """
    Form for individual user account
    """
    date_today = date.today()

    user_name = forms.CharField(max_length=30, widget=forms.HiddenInput(), required=True)
    date = forms.DateField(widget=forms.DateInput(attrs={
        'placeholder': date_today.isoformat(),
    }),
        required=True)
    money = forms.FloatField(initial=0.0, required=True)
    description = forms.CharField(max_length=70,
                                  widget=forms.TextInput(attrs={
                                      'placeholder': 'specific_place',
                                  }),
                                  required=True)
    category = forms.CharField(max_length=70,
                               widget=forms.TextInput(attrs={
                                   'placeholder': 'type of place/activity',
                               }),
                               required=True)
    payment = forms.CharField(max_length=70,
                              widget=forms.TextInput(attrs={
                                  'placeholder': 'account used',
                              }),
                              required=True)
    remove = forms.BooleanField(widget=forms.HiddenInput(), required=False)

    class Meta:
        model = Extract
        fields = ['user_name', 'date', 'money', 'description',
                  'category', 'payment']


class SelectExtractForm(forms.Form):
    """ Specific Columm """
    user_name = forms.CharField(max_length=30, widget=forms.HiddenInput(), required=True)
    columm = forms.CharField(max_length=70, required=True)

    class Meta:
        fields = ['user_name', 'columm']

# class RemoveForm(forms.Form):
#
#    user_name = forms.CharField(max_length=30, widget=forms.HiddenInput())
#    date = forms.DateField(widget=forms.HiddenInput())
#    money = forms.FloatField(widget=forms.HiddenInput())
#    description = forms.CharField(max_length=70, widget=forms.HiddenInput())
#    category = forms.CharField(max_length=70, widget=forms.HiddenInput())
#    payment = forms.CharField(max_length=70, widget=forms.HiddenInput())
#    remove = forms.BooleanField(default=True)
from django.test import TestCase

from charcoallog.core.forms import EditExtractForm


class Form1Test(TestCase):
    def setUp(self):
        self.form1 = EditExtractForm()

    def test_form1_has_fields(self):
        expected = ['user_name', 'date', 'money', 'description',
                    'category', 'payment', 'update_rm', 'pk']
        self.assertSequenceEqual(expected, list(self.form1.fields))

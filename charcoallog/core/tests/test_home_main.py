from django.contrib.auth.models import User
from django.test import TestCase


class HomeFailTest(TestCase):
    def setUp(self):
        self.response = self.client.get('/')

    def test_redirect_response(self):
        """ No login yet. Redirects to login page"""
        self.assertRedirects(self.response, '/conta/entrar/?next=/')


class HomeOKTest(TestCase):
    def setUp(self):
        user = User.objects.create(username='teste')
        user.set_password('1qa2ws3ed')
        user.save()

        self.login_in = self.client.login(username='teste', password='1qa2ws3ed')
        self.response = self.client.get('/')

    def test_login(self):
        self.assertTrue(self.login_in)

    def test_get_root(self):
        self.assertEqual(200, self.response.status_code)

    def test_template(self):
        self.assertTemplateUsed(self.response, 'home.html')

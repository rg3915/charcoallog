from .forms import EditExtractForm


class MethodPost:
    def __init__(self, request_method, request_post, request_user, query_user):
        """
        :param request_method: POST or GET
        :param request_post: dict()
        :param request_user: request.user
        :param query_user: Extract models instance
        """
        # self.request_method = request_method
        self.request_post = request_post
        self.request_user = request_user
        self.query_user = query_user
        self.editextractform = EditExtractForm
        self.form = None

        if request_method == 'POST':
            self.method_post()

    def method_post(self):
        self.form = self.editextractform(self.request_post)

        if self.form.is_valid():
            self.insert_by_post(self.form)
        else:
            print('INVALID')

    def insert_by_post(self, form):
        what_to_do = form.cleaned_data.get('update_rm')
        del form.cleaned_data['update_rm']
        # id_for_update = form.cleaned_data.get('pk')
        del form.cleaned_data['pk']

        form.cleaned_data['user_name'] = self.request_user

        if not what_to_do:
            form.save()
        # elif what_to_do == 'remove':
        #     self.query_user.filter(**form.cleaned_data).delete()
        # elif what_to_do == 'update':
        #     obj = self.query_user.get(id=id_for_update)  # , user_name=self.request_user)
        #     obj.date = form.cleaned_data['date']
        #     obj.money = form.cleaned_data['money']
        #     obj.description = form.cleaned_data['description']
        #     obj.category = form.cleaned_data['category']
        #     obj.payment = form.cleaned_data['payment']
        #     obj.save(update_fields=['date', 'money', 'description', 'category', 'payment'])

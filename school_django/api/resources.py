from tastypie.resources import ModelResource
from tastypie import fields
from api.models import School, Statistics, User
from tastypie.authorization import Authorization

class SchoolResource(ModelResource):
    class Meta:
        queryset = School.objects.all()
        resource_name = 'school'
        authorization = Authorization()
        # fields = ['school_name']

class StatisticsResource(ModelResource):
    school_id = fields.ForeignKey(SchoolResource, 'school_id')
    class Meta:
        queryset = Statistics.objects.all()
        resource_name = 'statistics'
        allowed_methods = ['get', 'post', 'put', 'delete']
        authorization = Authorization()

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'users'
        authorizaiton = Authorization()
    

from tastypie.resources import ModelResource
from api.models import School, Statistics, User
from tastypie.authorization import Authorization

class SchoolResource(ModelResource):
    class Meta:
        queryset = School.objects.all()
        resource_name = 'school'
        authorization = Authorization()
        fields = ['school_name']

class StatisticsResource(ModelResource):
    class Meta:
        queryset = Statistics.objects.all()
        resource_name = 'statistics'
        authorization = Authorization()

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'users'
        authorizaiton = Authorization()
    

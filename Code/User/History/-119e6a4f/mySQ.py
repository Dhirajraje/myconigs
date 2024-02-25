from rest_framework import serializers
from .models import DBPMaster,UserModel


class UserModelSerailizer(serializers.ModelSerializer):
    class Meta:
        model=UserModel
        fields='__all__'



class PostDBPSerializer(serializers.Serializer):
    base_price = serializers.FloatField()
    base_distance = serializers.FloatField()
    applicable_days = serializers.ListSerializer(child=serializers.CharField())


class PatchDBPSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    base_price = serializers.FloatField()
    base_distance = serializers.FloatField()
    applicable_days = serializers.ListSerializer(child=serializers.CharField())


class DBPModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=DBPMaster
        fields='__all__'



class NestedDBPModelSerializer(serializers.ModelSerializer):
    created_by = UserModelSerailizer(required=False)
    updated_by = UserModelSerailizer(required=False)
    class Meta:
        model=DBPMaster
        fields='__all__'

class DayGetRequest(serializers.Serializer):
    dbp_id = serializers.IntegerField(required=False)

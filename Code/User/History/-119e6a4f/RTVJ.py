from rest_framework import serializers
from .models import DBPMaster,UserModel


class UserModelSerailizer(serializers.ModelSerializer):
    class Meta:
        model=UserModel
        field='__all__'



class PostDBPSerializer(serializers.Serializer):
    base_price = serializers.FloatField()
    base_distance = serializers.FloatField()
    applicable_days = serializers.JSONField()


class PotchDBPSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    base_price = serializers.FloatField()
    base_distance = serializers.FloatField()
    applicable_days = serializers.JSONField()


class DBPModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=DBPMaster
        field='__all__'



class NestedDBPModelSerializer(serializers.ModelSerializer):
    created_by = UserModelSerailizer()
    updated_by = UserModelSerailizer()
    class Meta:
        model=DBPMaster
        field='__all__'

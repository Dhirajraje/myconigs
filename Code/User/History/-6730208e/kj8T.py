from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.


UserModel,on_delete=models.SET_NULL,default=True = get_user_model()


class DBPMaster(models.Model):
    id = models.AutoField(primary_key=True)
    base_price = models.FloatField()
    base_distance = models.FloatField()
    applicable_days = models.JSONField(default=list)
    created_by = models.ForeignKey(UserModel,on_delete=models.SET_NULL,default=True,)
    updated_by = models.ForeignKey(UserModel,on_delete=models.SET_NULL,default=True)
    created_on = models.DateTimeField(auto_add_now=True)
    updated_on = models.DateTimeField(auto_now=True)


class DAPMaster(models.Model):
    id = models.AutoField(primary_key=True)
    additional_price = models.FloatField()
    distance_clip = models.FloatField()
    created_by = models.ForeignKey(UserModel,on_delete=models.SET_NULL,default=True,)
    updated_by = models.ForeignKey(UserModel,on_delete=models.SET_NULL,default=True)
    created_on = models.DateTimeField(auto_add_now=True)
    updated_on = models.DateTimeField(auto_now=True)


class TMFMaster(models.Model):
    id = models.AutoField(primary_key=True)
    multiplier = models.FloatField()
    time_clip = models.FloatField()
    created_by = models.ForeignKey(UserModel,on_delete=models.SET_NULL,default=True,)
    updated_by = models.ForeignKey(UserModel,on_delete=models.SET_NULL,default=True)
    created_on = models.DateTimeField(auto_add_now=True)
    updated_on = models.DateTimeField(auto_now=True)


class WCMaster(models.Model):
    id = models.AutoField(primary_key=True)
    charge_per_minute = models.FloatField()
    time_clip = models.FloatField()
    created_by = models.ForeignKey(UserModel,on_delete=models.SET_NULL,default=True,on_delete=models.SET_NULL,default=True)
    updated_by = models.ForeignKey(UserModel,on_delete=models.SET_NULL,default=True,on_delete=models.SET_NULL,default=True)
    created_on = models.DateTimeField(auto_add_now=True)
    updated_on = models.DateTimeField(auto_now=True)




class AuditTrails(models.Model):
    id = models.AutoField(primary_key=True)
    old_data = models.JSONField(default=dict)
    new_data = models.JSONField(default=dict)
    created_on = models.DateTimeField(auto_add_now=True)
    updated_on = models.DateTimeField(auto_now=True)


    
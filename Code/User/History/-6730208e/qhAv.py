from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.


UserModel = get_user_model()


class DBPMaster(models.Model):
    id = models.AutoField(primary_key=True)
    base_price = models.FloatField()
    base_distance = models.FloatField()
    applicable_days = models.JSONField(default=list)
    created_by = models.ForeignKey(UserModel,)
    updated_by = models.ForeignKey(UserModel)
    created_on = models.DateTimeField(auto_add_now=True)
    updated_on = models.DateTimeField(auto_now=True)
from django.db import models


class User(models.Model):
    login = models.CharField(max_length=50)
    password = models.CharField(max_length=50)


class Quest(models.Model):
    title = models.CharField(max_length=100)
    creator = models.ForeignKey(User, \
                                on_delete=models.CASCADE)
    description = models.CharField(max_length=1000)


class QuestPoint(models.Model):
    class PointStatus(models.TextChoices):
        HIDDEN = 'hidden'
        VISIBLE = 'visible'
        VISITED = 'visited'

    status = models.CharField(
        max_length=7,
        choices=PointStatus.choices,
        default=PointStatus.VISIBLE,
    )
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    quest = models.ForeignKey(Quest, \
                              on_delete=models.CASCADE,
                              null=True)
    parentPoint = models.ForeignKey('self', \
                                    on_delete=models.CASCADE,\
                                    null=True)


class Sessions(models.Model):
    user = models.ForeignKey(User, \
                             on_delete=models.CASCADE)
    quest = models.ForeignKey(Quest, \
                              on_delete=models.CASCADE)
    isEnded = models.BooleanField(default=False)

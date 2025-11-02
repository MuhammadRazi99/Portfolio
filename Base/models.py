from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.core.exceptions import ValidationError

# Education Model
class Education(models.Model):
    school=models.CharField(max_length=100)
    degree=models.CharField(max_length=100)
    years=models.CharField(max_length=25)
    cgpa=models.DecimalField(max_digits=5,decimal_places=2)
    ordinal=models.IntegerField()
    class Meta:
        ordering=['ordinal']

# Experience Model
class Experience(models.Model):
    title=models.CharField(max_length=100,null=True)
    company=models.CharField(max_length=100)
    duration=models.CharField(max_length=50)
    description=models.TextField()
    ordinal=models.IntegerField()
    class Meta:
        ordering=['ordinal']
# Generaic Image Model (that should be used for multiple sectors)
class PortfolioImage(models.Model):
    image = models.ImageField(upload_to="uploads/")
    caption = models.CharField(max_length=200, blank=True)
    ordinal = models.IntegerField()
    # Polymorphic fields
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.content_type} with id {self.object_id} ({self.image})"
    class Meta:
        ordering=['ordinal']

# Project Model
class Project(models.Model):
    title=models.CharField(max_length=100)
    summary = models.CharField(max_length=255, blank=True, default='')
    images = GenericRelation('PortfolioImage', related_query_name='project')
    description=models.TextField()
    url=models.URLField(null=True)
    tech_stack = models.JSONField(default=list, blank=True)
    ordinal=models.IntegerField()
    class Meta:
        ordering=['ordinal']


# Certificate Model
class Certificate(models.Model):
    title=models.CharField(max_length=100)
    issuer=models.CharField(max_length=100)
    images = GenericRelation('PortfolioImage', related_query_name='certifacte')
    url=models.URLField()
    ordinal=models.IntegerField()
    class Meta:
        ordering=['ordinal']

    def clean(self):
        if self.pk and self.images.count() > 1:
            raise ValidationError("A Certificate can only have one image")
    
    @property
    def image(self):
        return self.images.last()

# Publication Model
class Publication(models.Model):
    title=models.CharField(max_length=200)
    publishers=models.CharField(max_length=100)
    url=models.URLField()
    ordinal=models.IntegerField()
    class Meta:
        ordering=['ordinal']

# Achievement Model
class Achievement(models.Model):
    title=models.CharField(max_length=200)
    description=models.TextField()
    images = GenericRelation('PortfolioImage', related_query_name='achievement')
    ordinal=models.IntegerField()
    class Meta:
        ordering=['ordinal']
    
    def clean(self):
        if self.pk and self.images.count() > 1:
            raise ValidationError("An Achievement can only have one image")
    
    @property
    def image(self):
        return self.images.last()
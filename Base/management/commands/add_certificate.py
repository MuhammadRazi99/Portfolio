from django.core.management.base import BaseCommand, CommandError
from django.contrib.contenttypes.models import ContentType
from pathlib import Path
from Base.models import Certificate, PortfolioImage


class Command(BaseCommand):
  help = "Create a certificate and attach an image"

  def add_arguments(self, parser):
    parser.add_argument("--title", required=True)
    parser.add_argument("--issuer", required=True)
    parser.add_argument("--url", required=True)
    parser.add_argument("--image", required=True)
    parser.add_argument("--caption", default="")
    parser.add_argument("--ordinal", type=int)

  def handle(self, *args, **options):
    image_path = options["image"]

    # Safety Check 1: File exists
    if not Path(image_path).exists():
      raise CommandError(
        f"Image file does not exist: {image_path}"
      )

    # Safety Check 2: Duplicate certificate title
    if Certificate.objects.filter(
      title=options["title"]
    ).exists():
      raise CommandError(
        f'Certificate "{options["title"]}" already exists.'
      )
    
    ordinal = options["ordinal"]

    if ordinal is None:
      first = Certificate.objects.order_by("ordinal").first()
      ordinal = (first.ordinal - 1) if first else 1

    certificate = Certificate.objects.create(
      title=options["title"],
      issuer=options["issuer"],
      url=options["url"],
      ordinal=ordinal,
    )

    if certificate.pk is not None:
      PortfolioImage.objects.create(
        image=options["image"],
        caption=options["caption"],
        ordinal=1,
        content_type=ContentType.objects.get_for_model(Certificate),
        object_id=certificate.id,
      )

      self.stdout.write(
        self.style.SUCCESS(
            f"Created certificate #{certificate.id}: {certificate.title} having ordinal {certificate.ordinal}"
        )
      )
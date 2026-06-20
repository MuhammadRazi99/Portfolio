from pathlib import Path

from django.core.management.base import BaseCommand, CommandError
from django.contrib.contenttypes.models import ContentType
from django.db import transaction

from Base.models import Project, PortfolioImage


class Command(BaseCommand):
    help = "Create a project and attach an image"

    def add_arguments(self, parser):
        parser.add_argument("--title", required=True)
        parser.add_argument("--summary", default="")
        parser.add_argument("--description", required=True)
        parser.add_argument("--url", default="")
        parser.add_argument("--image", required=True)
        parser.add_argument("--caption", default="")
        parser.add_argument("--ordinal", type=int)

        parser.add_argument(
            "--tech-stack",
            nargs="*",
            default=[],
            help="Example: --tech-stack Django DRF PostgreSQL Docker"
        )

    def handle(self, *args, **options):
        image_path = options["image"]

        # Safety Check 1: Image exists
        if not Path(image_path).exists():
            raise CommandError(
                f"Image file does not exist: {image_path}"
            )

        # Safety Check 2: Duplicate title
        if Project.objects.filter(title=options["title"]).exists():
            raise CommandError(
                f'Project "{options["title"]}" already exists.'
            )

        # Safety Check 3: Auto ordinal
        ordinal = options["ordinal"]

        if ordinal is None:
            first = Project.objects.order_by("ordinal").first()
            ordinal = (first.ordinal - 1) if first else 1

        # Safety Check 4: Duplicate ordinal
        if Project.objects.filter(ordinal=ordinal).exists():
            raise CommandError(
                f"Ordinal {ordinal} already exists."
            )

        with transaction.atomic():

            project = Project.objects.create(
                title=options["title"],
                summary=options["summary"],
                description=options["description"],
                url=options["url"] or None,
                tech_stack=options["tech_stack"],
                ordinal=ordinal,
            )

            PortfolioImage.objects.create(
                image=image_path,
                caption=options["caption"],
                ordinal=1,
                content_type=ContentType.objects.get_for_model(Project),
                object_id=project.id,
            )

        self.stdout.write(
            self.style.SUCCESS(
                f"Created project #{project.id}: "
                f"{project.title} "
                f"(ordinal={project.ordinal})"
            )
        )
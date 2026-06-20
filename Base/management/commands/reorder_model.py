from django.core.management.base import BaseCommand
from Base.models import Certificate


class Command(BaseCommand):
    help = "Reorder experience ordinals"

    def handle(self, *args, **options):
        experiences = list(
            Certificate.objects.order_by("ordinal")
        )

        # experiences.reverse()
        start = 100

        for i, exp in enumerate(experiences):
            exp.ordinal = start - i

        Certificate.objects.bulk_update(
            experiences,
            ["ordinal"]
        )

        self.stdout.write(
            self.style.SUCCESS(
                f"Updated {len(experiences)} records"
            )
        )
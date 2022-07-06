import random
from decouple import config
from django.core.mail import send_mail

from utils.otp_email_template import get_html_email_template


def generate_otp() -> int:
  otp = random.randint(100000, 999999)
  return otp


def send_otp_to_email(recipient_email, otp):
  html_email_template = get_html_email_template(otp)

  send_mail(
    subject='Verify your email address - DoItBro',
    message=f'Verification Code - {otp}',
    html_message=html_email_template,
    from_email=config('EMAIL_HOST_USER'),
    recipient_list=[recipient_email, ],
    fail_silently=False,
  )

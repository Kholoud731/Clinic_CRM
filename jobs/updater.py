from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from .jobs import email_notification

# checks every 30 mins 
def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(email_notification,'interval',seconds=30)
    scheduler.start()
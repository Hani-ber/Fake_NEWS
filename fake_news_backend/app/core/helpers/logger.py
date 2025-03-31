import logging
import sys

class LoggerWriter:
    """Redirects stdout and stderr to the logger."""
    def __init__(self, level):
        self.level = level

    def write(self, message):
        if message.strip():  
            self.level(message)

    def flush(self):
        pass

# Configure logging (Only executed once when imported)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout), 
        logging.FileHandler("app.log", mode="a"),  
    ]
)
# Create a global logger instance
logger = logging.getLogger("fake_news_app")


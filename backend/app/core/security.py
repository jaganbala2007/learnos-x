import re
import hashlib

def sanitize_input(text: str) -> str:
    """Sanitize user input against basic prompt injection and script tag attacks."""
    if not text:
        return ""
    # Strip script tags
    cleaned = re.sub(r'<script.*?>.*?</script>', '', text, flags=re.DOTALL | re.IGNORECASE)
    # Remove system prompt injection tokens
    cleaned = re.sub(r'(\b(SYSTEM_PROMPT|IGNORE ALL INSTRUCTIONS|ADMIN_OVERRIDE)\b)', '', cleaned, flags=re.IGNORECASE)
    return cleaned.strip()

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

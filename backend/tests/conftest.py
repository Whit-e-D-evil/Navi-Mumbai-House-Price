import pytest
from httpx import ASGITransport, AsyncClient
from app.main import app

@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"

@pytest.fixture
async def client():
    # Ensure model is loaded for testing
    from app.services.ml_service import ml_service
    if not ml_service.is_loaded:
        ml_service.load()
    
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac

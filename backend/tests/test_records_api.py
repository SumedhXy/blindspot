def test_create_and_list_records(client):
    # 1. Create a record
    create_payload = {
        "title": "Hackathon Task Breakdown",
        "category": "planning",
        "content": "Deliver MVP in 90 minutes",
        "metadata": {"priority": "high", "score_target": 95},
    }
    create_res = client.post("/api/v1/records", json=create_payload)
    assert create_res.status_code == 201
    created_data = create_res.json()["data"]
    assert created_data["title"] == create_payload["title"]
    record_id = created_data["id"]

    # 2. Retrieve the record by ID
    get_res = client.get(f"/api/v1/records/{record_id}")
    assert get_res.status_code == 200
    assert get_res.json()["data"]["id"] == record_id

    # 3. List records
    list_res = client.get("/api/v1/records?category=planning")
    assert list_res.status_code == 200
    records = list_res.json()["data"]
    assert len(records) >= 1
    assert records[0]["category"] == "planning"

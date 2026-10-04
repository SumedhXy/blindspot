"""
Scenario Bank Integration Tests for BlindSpot Engine.
Tests all 20 realistic, high-stakes decision scenarios across 5 logical domains:
- Group A: Student & Academic Decisions
- Group B: Career & Corporate Decisions
- Group C: Business & Entrepreneurship Decisions
- Group D: Personal Finance & Life Architecture Decisions
- Group E: Edge-Case & Chaos Tests
"""

import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

SCENARIOS = [
    # Group A: Student & Academic Decisions
    {
        "id": "scenario_1",
        "name": "The Burnout Risk (JEE Exam)",
        "prompt": "Should I prepare for the upcoming JEE Advanced exam by self-studying 14 hours a day at home?",
        "reasoning": "Self-studying saves travel time to coaching institutes, gives me complete freedom over my schedule, and allows me to save money for college.",
        "priorities": ["Learning Velocity", "Financial Stability", "Stress Management"],
    },
    {
        "id": "scenario_2",
        "name": "The Brand Name Trap (Tier-3 Scholarship)",
        "prompt": "Should I join a tier-3 university because they offered me a 100% full merit scholarship over a tier-1 institute?",
        "reasoning": "Graduating completely debt-free will take immense financial pressure off my family, and a degree is ultimately just a piece of paper.",
        "priorities": ["Financial Stability", "Family Alignment", "Career Growth"],
    },
    {
        "id": "scenario_3",
        "name": "The Research vs Job Dilemma",
        "prompt": "Should I accept a low-paying academic research assistantship under a famous professor instead of a corporate software engineer job?",
        "reasoning": "The professor is a pioneer in AI, so working with them will guarantee that I get into a top-tier Ivy League PhD program later.",
        "priorities": ["Career Growth", "Prestige", "Direct Compensation"],
    },
    {
        "id": "scenario_4",
        "name": "The Over-Commitment Trap (Fest Chair)",
        "prompt": "Should I take up the role of College Festival Chairperson during my placements semester?",
        "reasoning": "Leading a festival of 5,000+ people will show corporate recruiters that I possess world-class leadership and crisis management skills.",
        "priorities": ["Career Growth", "Peer Status", "Academic Performance"],
    },

    # Group B: Career & Corporate Decisions
    {
        "id": "scenario_5",
        "name": "The Hype Train (Web3 Startup)",
        "prompt": "Should I quit my stable tech job to join an early-stage Web3 startup that offers a 40% pay cut but high equity?",
        "reasoning": "The founders graduated from IIT, the sector is booming, and getting in early means I will become a millionaire when the company goes public.",
        "priorities": ["Career Growth", "Wealth Generation", "Stability"],
    },
    {
        "id": "scenario_6",
        "name": "The Golden Handcuffs (Toxic 60% Hike)",
        "prompt": "Should I reject a promotion at my current firm to take a job at a company notorious for toxic work culture but offering a 60% salary hike?",
        "reasoning": "I am highly resilient, I can tolerate anything for 12 months, and the extra cash will allow me to clear my family's debts immediately.",
        "priorities": ["Direct Compensation", "Mental Wellness", "Career Trajectory"],
    },
    {
        "id": "scenario_7",
        "name": "The Freelance Leap",
        "prompt": "Should I leave my corporate role to become a full-time freelance consultant?",
        "reasoning": "Freelancing will give me complete geographic freedom to travel the world while setting my own working hours.",
        "priorities": ["Autonomy", "Work-Life Balance", "Financial Stability"],
    },
    {
        "id": "scenario_8",
        "name": "The Management Pivot",
        "prompt": "Should I transition from an Individual Contributor (Software Engineer) to a People Manager role?",
        "reasoning": "Management pays more, carries a higher corporate status, and is the only logical step to move up the ladder.",
        "priorities": ["Status", "Compensation", "Coding Joy"],
    },

    # Group C: Business & Entrepreneurship
    {
        "id": "scenario_9",
        "name": "The Solo-Founder Bias (No-Code MVP)",
        "prompt": "Should I launch my software product without a technical co-founder by using no-code tools?",
        "reasoning": "Finding a good co-founder takes months, splits equity in half, and I want to launch my MVP next week before anyone else copies the idea.",
        "priorities": ["Speed to Market", "Equity Retention", "Product Quality"],
    },
    {
        "id": "scenario_10",
        "name": "The Capital Trap (5 Cr VC Funding)",
        "prompt": "Should we accept ₹5 Crores in Venture Capital funding that demands aggressive 10x growth targets?",
        "reasoning": "Having a massive cash cushion means we can out-hire our competitors, dominate marketing channels, and capture the market safely.",
        "priorities": ["Market Dominance", "Operational Autonomy", "Personal Peace"],
    },
    {
        "id": "scenario_11",
        "name": "The Pivot Panic (Enterprise B2B)",
        "prompt": "Should we pivot our entire B2B SaaS platform to target enterprise clients instead of small businesses?",
        "reasoning": "Enterprise clients pay 20x more per month, meaning we only need 10 clients to hit our revenue goals instead of chasing hundreds of small ones.",
        "priorities": ["Revenue Velocity", "Product Simplicity", "Customer Support Ease"],
    },
    {
        "id": "scenario_12",
        "name": "The Physical Overhead (Cloud Kitchen Lease)",
        "prompt": "Should I sign a 3-year commercial lease to open a physical cloud kitchen instead of running it out of my house?",
        "reasoning": "A premium commercial kitchen location will automatically build local brand trust and attract premium corporate catering orders.",
        "priorities": ["Brand Scalability", "Low Financial Risk", "Operational Convenience"],
    },

    # Group D: Personal Finance & Life Architecture
    {
        "id": "scenario_13",
        "name": "The Real Estate Hook (20-yr Mortgage)",
        "prompt": "Should I take a 20-year home loan to buy a luxury apartment in a metro city right now?",
        "reasoning": "Real estate prices only go up, renting is just throwing money away every month, and it will give my family long-term stability.",
        "priorities": ["Stability", "Financial Flexibility", "Luxury Lifestyle"],
    },
    {
        "id": "scenario_14",
        "name": "The Relocation Dilemma (Germany Move)",
        "prompt": "Should I relocate to a new country (e.g., Germany) for a job that pays the same relative purchasing power as my current Indian tech role?",
        "reasoning": "Moving abroad will expose me to a new global culture, improve my quality of life, and give me a powerful foreign passport in 5 years.",
        "priorities": ["Personal Growth", "Proximity to Family", "Financial Savings"],
    },
    {
        "id": "scenario_15",
        "name": "The Bootstrapped Education (30L Exec MBA)",
        "prompt": "Should I pay ₹30 Lakhs out of my own personal savings for an Executive MBA?",
        "reasoning": "The elite alumni network will instantly open doors to high-paying executive leadership roles that are currently closed to me.",
        "priorities": ["Career Velocity", "Liquidity (Cash on Hand)", "Immediate ROI"],
    },
    {
        "id": "scenario_16",
        "name": "The Health vs Wealth Split (Night Shift)",
        "prompt": "Should I take a night-shift logistics manager job that pays a 35% premium over day-shift jobs?",
        "reasoning": "The extra income will let me invest aggressively in the stock market early in my life, and my sleep cycle will naturally adjust after a couple of weeks.",
        "priorities": ["Financial Velocity", "Health & Longevity", "Leisure Time"],
    },

    # Group E: Edge-Case & Chaos Tests
    {
        "id": "scenario_17",
        "name": "The Infinite Loop Test (Indecision)",
        "prompt": "Should I decide to make a decision later?",
        "reasoning": "If I don't choose anything right now, I don't lose any options, which keeps my freedom at a maximum.",
        "priorities": ["Freedom", "Progress"],
    },
    {
        "id": "scenario_18",
        "name": "The Contradiction Trap (Sports Bike Loan)",
        "prompt": "Should I buy a high-end sports bike?",
        "reasoning": "I want to save every single rupee to retire by age 30, and buying this bike requires taking out a high-interest personal loan.",
        "priorities": ["Extreme Frugality", "Instant Gratification"],
    },
    {
        "id": "scenario_19",
        "name": "The Vague Input",
        "prompt": "Doing something new.",
        "reasoning": "Things are boring right now, so moving somewhere else or changing things up will make everything better.",
        "priorities": ["Fun", "Security"],
    },
    {
        "id": "scenario_20",
        "name": "The High-Stakes Crisis (Chemical Leak)",
        "prompt": "Should we shut down our factory operations immediately due to a minor, unconfirmed chemical leak rumor?",
        "reasoning": "If the rumor is true, the public relations damage will destroy the company completely, but stopping operations will cost us ₹50 Lakhs a day.",
        "priorities": ["Public Safety", "Financial Survival", "Legal Compliance"],
    },
]


@pytest.mark.parametrize("scenario", SCENARIOS, ids=[s["id"] for s in SCENARIOS])
def test_all_scenario_bank_audits(scenario):
    """Verifies that all 20 scenario bank dilemmas return complete, high-fidelity 6-lens audits."""
    payload = {
        "decision_prompt": scenario["prompt"],
        "context_reasoning": scenario["reasoning"],
        "priorities": scenario["priorities"],
    }
    response = client.post("/api/v1/blindspot/analyze", json=payload)
    assert response.status_code == 200
    res_json = response.json()
    assert res_json["success"] is True
    data = res_json["data"]

    # 1. Decision summary preservation
    assert len(data["decision_summary"]) > 0

    # 2. Multi-Agent debate trace
    assert len(data["agent_trace"]["steps"]) >= 3

    # 3. All 6 lenses populated
    assert len(data["assumptions"]) >= 1
    assert len(data["missing_information"]) >= 1
    assert len(data["reasoning_tensions"]) >= 1
    assert len(data["alternative_perspectives"]) >= 2
    assert len(data["evidence_gaps"]) >= 1
    assert len(data["sensitivity_factors"]) >= 1

    # 4. Stress test scenario constructed
    assert len(data["stress_test"]["scenario_premise"]) > 10
    assert len(data["stress_test"]["prompt_question"]) > 5

    # 5. Action checklist
    assert len(data["investigation_checklist"]) >= 3

    # 6. Negative constraints verified (No decision scores or prescriptive advice)
    res_text = response.text.lower()
    assert "decision quality score" not in res_text
    assert "decision score:" not in res_text

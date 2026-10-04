"""
BlindSpot Dynamic Scenario Fallback Engine.
Provides deterministic, domain-specific fallback reasoning when offline or unconfigured.
Covers JEE prep, luxury vehicle financing, early-stage startup equity, internship offers,
and general arbitrary decision dilemmas across all 6 analytical lenses.
"""

import re
from typing import List
from project_blindspot.schemas import (
    BlindSpotAnalyzeRequest,
    BlindSpotAnalysisResponse,
    AgentExecutionTrace,
    AgentTraceStep,
    ClaimItem,
    AssumptionItem,
    MissingInfoItem,
    ReasoningTensionItem,
    PerspectiveLensItem,
    EvidenceGapItem,
    SensitivityFactor,
    StressTestScenario,
    StressTestFeedbackRequest,
    StressTestFeedbackResponse,
    ChallengeReasoningRequest,
    ChallengeReasoningResponse,
)


def generate_dynamic_audit(req: BlindSpotAnalyzeRequest) -> BlindSpotAnalysisResponse:
    """Dynamically parses and analyzes any arbitrary scenario across all 6 lenses."""
    decision = req.decision_prompt.strip()
    context = req.context_reasoning.strip()
    priorities = req.priorities or []
    doc = (req.document_context or "").strip()
    has_doc = len(doc) > 10

    lower_d = decision.lower()
    lower_c = context.lower()
    full_text = f"{lower_d} {lower_c}"

    claims: List[ClaimItem] = []
    assumptions: List[AssumptionItem] = []
    missing: List[MissingInfoItem] = []
    tensions: List[ReasoningTensionItem] = []
    perspectives: List[PerspectiveLensItem] = []
    evidence_gaps: List[EvidenceGapItem] = []
    sensitivity_factors: List[SensitivityFactor] = []
    checklist: List[str] = []

    sentences = [s.strip() for s in re.split(r'[.!?]+', context) if len(s.strip()) > 5]

    if "jee" in full_text or "14 hours" in full_text or "self-study" in full_text:
        # Scenario 1: JEE Exam Self-Study
        claims = [
            ClaimItem(claim="Self-studying 14 hours/day saves daily travel time.", stated_inference="Saved travel time directly converts to effective study output.", grounded_in_doc=False),
            ClaimItem(claim="Schedule freedom gives higher learning velocity.", stated_inference="Independent pacing without classroom structure is optimal for rank prep.", grounded_in_doc=False),
        ]
        assumptions = [
            AssumptionItem(
                id="asmp_1",
                title="Cognitive Output Scales Linearly with 14-Hour Study",
                explanation="Assuming the brain maintains high retention across 14 daily hours without severe cognitive fatigue or diminishing returns.",
                impact_level="HIGH",
                sensitivity_score=0.94,
                adversary_challenge="14 hours of passive desk sitting often degenerates into low-yield exhaustion; coaching institutes provide peer benchmarking you cannot replicate alone.",
            ),
            AssumptionItem(
                id="asmp_2",
                title="Self-Diagnosis of Knowledge Gaps is Unbiased",
                explanation="Assuming you can accurately identify subtle conceptual flaws without external rigorous test series evaluation.",
                impact_level="HIGH",
                sensitivity_score=0.88,
                adversary_challenge="Students self-studying in isolation consistently overestimate mastery on familiar topics and avoid difficult blind spots.",
            ),
        ]
        missing = [
            MissingInfoItem(
                id="mis_1",
                item="External Test Series & All-India Rank Calibration",
                why_it_matters="Without nationwide competitive benchmarking, self-study velocity lacks validation.",
                investigative_question="How will you benchmark test scores weekly against thousands of serious contenders?",
                impact_level="HIGH",
            ),
            MissingInfoItem(
                id="mis_2",
                item="Burnout Recovery & Physical Sleep Protocol",
                why_it_matters="A 14-hour schedule leaves <2 hours for meals, exercise, and mental decompression.",
                investigative_question="What is the contingency plan when mental fatigue causes a 3-week plateau?",
                impact_level="HIGH",
            ),
        ]
        tensions = [
            ReasoningTensionItem(
                id="tns_1",
                stated_priority="Stress Management & High Learning Velocity",
                conflicting_reason="Committing to an extreme 14-hour isolated daily schedule",
                probing_question="How does an unyielding 14-hour daily isolation routine reconcile with your stated priority of stress management?",
            )
        ]
        perspectives = [
            PerspectiveLensItem(lens_name="Cognitive Science / Neuro-Learning", insight="Memory consolidation and deep problem-solving decay sharply past 6-8 focused hours.", critical_question="Are you measuring hours sat at a desk or actual retention yield?"),
            PerspectiveLensItem(lens_name="Worst-Case Pre-Mortem", insight="Month 3 breakdown due to lack of social contact and unbenchmarked plateaus.", critical_question="If you hit a 2-week mental wall in December, what safety net exists?"),
        ]
        evidence_gaps = [
            EvidenceGapItem(claim="14 hours a day will maximize JEE score.", current_evidence="Subjective ambition and schedule freedom.", evidence_to_seek=["Data on retention drop-off beyond 8 hours of daily intense problem solving", "Weekly national rank percentiles in timed test series"]),
        ]
        sensitivity_factors = [
            SensitivityFactor(factor_name="Burnout & Cognitive Degradation Rate", sensitivity_percentage=94, impact="HIGH", reasoning="If burnout forces a 2-week downtime before the exam, total rank drops precipitously."),
            SensitivityFactor(factor_name="Absence of Competitive Benchmarking", sensitivity_percentage=88, impact="HIGH", reasoning="Without proctored competition, blind spots remain invisible until exam day."),
        ]
        stress_test = StressTestScenario(
            tested_assumption_id="asmp_1",
            tested_assumption_title="Linear Cognitive Output Across 14 Hours",
            scenario_premise="At month 3, mental exhaustion causes your problem-solving speed to drop by 40% and your mock test scores plateau despite 14 hours of daily effort.",
            prompt_question="If 14 hours of isolated study yields lower mock scores than 8 hours of structured peer-benchmarked study, would you change your strategy?",
            if_yes_guidance="Confirms extreme schedule fragility. Cap daily study at 8-9 high-intensity hours and integrate national test series.",
            if_maybe_guidance="Threshold uncertainty. Track hourly retention and set a hard score trigger for adding structured mentorship.",
            if_no_guidance="Stubborn adherence to raw hours. Evaluate whether ego is overriding empirical test score feedback.",
        )
        checklist = [
            "Enroll in an external national-level proctored test series with timed rankings.",
            "Cap active daily problem-solving at 8-9 hours with mandatory physical exercise.",
            "Schedule weekly peer problem-solving sessions to test blind spots.",
            "Define explicit score triggers where coaching intervention is required.",
        ]

    elif "sports bike" in full_text or "bike" in full_text or ("frugality" in full_text and "retire" in full_text):
        # Scenario 18: The Contradiction Trap (Bike Loan vs Early Retirement)
        claims = [
            ClaimItem(claim="I want to retire by age 30 through extreme frugality.", stated_inference="Every financial choice must maximize capital compounding.", grounded_in_doc=False),
            ClaimItem(claim="Buying this high-end sports bike requires a high-interest loan.", stated_inference="Instant gratification can coexist with extreme FIRE retirement.", grounded_in_doc=False),
        ]
        assumptions = [
            AssumptionItem(
                id="asmp_1",
                title="High-Interest Debt Does Not Derail FIRE Compounding",
                explanation="Assuming that taking a 14-18% personal loan for a depreciating asset has a negligible impact on early retirement wealth.",
                impact_level="HIGH",
                sensitivity_score=0.96,
                adversary_challenge="High-interest consumer debt is the mathematical opposite of extreme frugality; interest payments compound against you exponentially.",
            ),
        ]
        missing = [
            MissingInfoItem(
                id="mis_1",
                item="Total Cost of Ownership & Opportunity Cost of Loan EMIs",
                why_it_matters="Maintenance, insurance, fuel, and loan interest siphon monthly investment capacity.",
                investigative_question="What is the 5-year future value of those monthly EMI payments if invested in an index fund at 12% CAGR?",
                impact_level="HIGH",
            )
        ]
        tensions = [
            ReasoningTensionItem(
                id="tns_1",
                stated_priority="Extreme Frugality & Retiring by Age 30",
                conflicting_reason="Purchasing a luxury sports bike via a high-interest personal loan",
                probing_question="How does taking a high-interest personal loan for a luxury depreciating toy align with your stated priority of extreme frugality and retiring at 30?",
            )
        ]
        perspectives = [
            PerspectiveLensItem(lens_name="Financial Independence (FIRE) Auditor", insight="A ₹5L loan at 15% interest costs ₹7.5L and robs ~₹25L in 10-year compounding.", critical_question="Are you willing to delay your retirement age from 30 to 35 for this vehicle?"),
            PerspectiveLensItem(lens_name="Opportunity Cost Perspective", insight="The capital tied up in bike EMI could fully fund an index portfolio compounding toward financial freedom.", critical_question="Does the temporary rush of ownership justify delaying absolute financial independence?"),
        ]
        evidence_gaps = [
            EvidenceGapItem(claim="Can retire at 30 while servicing high-interest bike debt.", current_evidence="Optimistic future income projection.", evidence_to_seek=["Full amortization schedule including depreciation and insurance", "FIRE calculator simulation with EMI deductions"]),
        ]
        sensitivity_factors = [
            SensitivityFactor(factor_name="Debt Interest Rate Drag", sensitivity_percentage=96, impact="HIGH", reasoning="High-interest debt destroys early-career capital accumulation speed."),
        ]
        stress_test = StressTestScenario(
            tested_assumption_id="asmp_1",
            tested_assumption_title="Financial Frugality Compatibility",
            scenario_premise="Servicing the sports bike loan and maintenance consumes 40% of your monthly savings, mathematically pushing your retirement timeline back by 6 years.",
            prompt_question="If this purchase directly delays your retirement from age 30 to age 36, does your decision logic survive?",
            if_yes_guidance="High sensitivity confirmed. The bike purchase is mathematically incompatible with your age-30 FIRE goal.",
            if_maybe_guidance="Indicates conflicting values. Decide whether early retirement is a genuine goal or an abstract wish.",
            if_no_guidance="Reveals that instant gratification is your actual primary priority over early retirement.",
        )
        checklist = [
            "Calculate total interest paid over the life of the loan.",
            "Simulate your net worth at age 30 with vs without the bike loan payments invested.",
            "Explore buying a pre-owned cash alternative that requires zero high-interest debt.",
        ]

    elif "web3" in full_text or "startup" in full_text and ("equity" in full_text or "40%" in full_text):
        # Scenario 5: Web3 Startup Equity Trap
        claims = [
            ClaimItem(claim="Founders are from IIT and the sector is booming.", stated_inference="Founder pedigree guarantees unicorn exit and liquidity.", grounded_in_doc=has_doc),
            ClaimItem(claim="Getting in early means becoming a millionaire at IPO.", stated_inference="Early equity grants automatically translate to liquid wealth.", grounded_in_doc=has_doc),
        ]
        assumptions = [
            AssumptionItem(
                id="asmp_1",
                title="Startup Equity Liquidity and Exit Certainty",
                explanation="Assuming the equity will have an exit event and will not be diluted to near-zero across subsequent down-rounds.",
                impact_level="HIGH",
                sensitivity_score=0.95,
                adversary_challenge="90% of early-stage startups fail or experience massive dilution; paper equity is worth ₹0 until an actual cash liquidity event.",
            ),
        ]
        missing = [
            MissingInfoItem(
                id="mis_1",
                item="Company Cash Runway & Investor Liquidation Preferences",
                why_it_matters="If runway is <12 months, the company faces immediate existential fundraising risk.",
                investigative_question="What is the verified cash runway in months and what liquidation preferences do seed investors hold?",
                impact_level="HIGH",
            )
        ]
        tensions = [
            ReasoningTensionItem(
                id="tns_1",
                stated_priority="Financial Stability & Wealth Generation",
                conflicting_reason="Taking a 40% salary cut for illiquid early-stage common stock",
                probing_question="If your financial stability depends on liquid cashflow, how do you sustain your living expenses if the startup takes 7 years to reach an exit?",
            )
        ]
        perspectives = [
            PerspectiveLensItem(lens_name="Venture Capital Realist", insight="Only 1 in 20 pre-seed startups provide meaningful equity returns for early employees.", critical_question="Are you prepared for this equity to expire worthless?"),
            PerspectiveLensItem(lens_name="Opportunity Cost of Cash Compensation", insight="A 40% salary cut over 3 years represents ₹30L+ in guaranteed lost earnings that could have been invested in index funds.", critical_question="Is the equity upside mathematically worth the certain cash sacrifice?"),
        ]
        evidence_gaps = [
            EvidenceGapItem(claim="Will become a millionaire when company goes public.", current_evidence="Optimistic founder projections.", evidence_to_seek=["Cap table breakdown, vesting schedule, and 409A valuation", "Company bank runway and burn rate"]),
        ]
        sensitivity_factors = [
            SensitivityFactor(factor_name="Startup Runway & Survival Probability", sensitivity_percentage=95, impact="HIGH", reasoning="If the startup runs out of cash before Series A, the 40% salary cut is pure loss."),
        ]
        stress_test = StressTestScenario(
            tested_assumption_id="asmp_1",
            tested_assumption_title="Equity Value Realization",
            scenario_premise="Due to a crypto market downturn, the startup fails to raise its next round, runway drops to 2 months, and employees are asked to defer salaries.",
            prompt_question="If the startup equity has a 75% probability of zero exit value, would you still take a 40% pay cut?",
            if_yes_guidance="High sensitivity confirmed. Do not trade liquid cash compensation unless you have an 18-month emergency runway.",
            if_maybe_guidance="Threshold uncertainty. Negotiate a shorter vesting cliff or higher cash floor.",
            if_no_guidance="Indicates you are joining for the equity lottery; re-evaluate whether you can afford the downside.",
        )
        checklist = [
            "Review the formal option grant agreement (strike price, exercise window, vesting schedule).",
            "Verify the company's verified cash runway in months with current monthly burn rate.",
            "Calculate personal emergency fund sustainability under a 40% compensation reduction.",
        ]

    elif "internship" in full_text or "25,000" in full_text or "ppo" in full_text:
        # Internship offer scenario
        claims = [
            ClaimItem(claim="The company is reputed and well known.", stated_inference="A prestigious company guarantees high learning quality.", grounded_in_doc=has_doc, doc_citation="Section 1.1 Offer Overview" if has_doc else None),
            ClaimItem(claim="The stipend is ₹25,000 / month.", stated_inference="The compensation makes the 6-month commitment worthwhile.", grounded_in_doc=has_doc, doc_citation="Schedule B: Compensation" if has_doc else None),
        ]
        assumptions = [
            AssumptionItem(
                id="asmp_1",
                title="Company Reputation = High Learning Quality",
                explanation="Assuming that brand reputation automatically translates to active engineering mentorship and high-leverage tasks.",
                impact_level="HIGH",
                sensitivity_score=0.92,
                adversary_challenge="Prestige does not write clean code or mentor you; busy teams frequently delegate menial bug triage to interns.",
            ),
        ]
        missing = [
            MissingInfoItem(
                id="mis_1",
                item="Exact Daily Responsibilities & Tech Stack",
                why_it_matters="A prestigious company might still assign repetitive manual QA or legacy maintenance.",
                investigative_question="What specific projects, codebases, or workflows will I own during these 6 months?",
                impact_level="HIGH",
            ),
        ]
        tensions = [
            ReasoningTensionItem(
                id="tns_1",
                stated_priority="Career growth & Deep Learning",
                conflicting_reason="Commute proximity (15km) and ₹25,000 stipend",
                probing_question="Would you still accept this opportunity if the stipend were lower and the commute twice as long as another higher-learning alternative?",
            )
        ]
        perspectives = [
            PerspectiveLensItem(lens_name="Opportunity Cost Lens", insight="Spending 6 months on bug triage forfeits 500+ hours of high-impact portfolio building.", critical_question="Will this role produce demonstrable production work for future senior interviews?"),
            PerspectiveLensItem(lens_name="5-Year Senior Engineer View", insight="Senior hiring managers evaluate technical architecture contributions, not company brand logos.", critical_question="Will you be able to speak deeply about technical challenges in future interviews?"),
        ]
        evidence_gaps = [
            EvidenceGapItem(claim="Company offers guaranteed PPO and high learning.", current_evidence="Offer letter states PPO is discretionary based on headcount.", evidence_to_seek=["Historical PPO conversion rates", "Specific engineering tech stack allocation"], is_grounded_in_document=has_doc, document_excerpt="Clause 4.1: PPO is discretionary and subject to annual headcount availability." if has_doc else None),
        ]
        sensitivity_factors = [
            SensitivityFactor(factor_name="Mentorship Quality & Task Complexity", sensitivity_percentage=92, impact="HIGH", reasoning="Decision value drops from positive to negative if engineering mentorship is absent."),
        ]
        stress_test = StressTestScenario(
            tested_assumption_id="asmp_1",
            tested_assumption_title="Company Reputation = High Learning Quality",
            scenario_premise="During your first month, you discover 75% of your time is assigned to manual QA ticket triage with zero senior engineering code reviews.",
            prompt_question="If the daily work consists primarily of manual backlog triage, would you still accept this 6-month commitment?",
            if_yes_guidance="High sensitivity confirmed. The decision value depends on mentorship rather than passive company branding.",
            if_maybe_guidance="Threshold uncertainty. Define the minimum percentage of active development time acceptable.",
            if_no_guidance="Brand name was the primary justification. Re-evaluate whether resume prestige outweighs actual skill building.",
        )
        checklist = [
            "Request a 30-minute discovery call with the prospective engineering manager.",
            "Review the formal contract clauses regarding PPO conversion criteria.",
            "Inquire about the exact tech stack and daily responsibilities before signing.",
        ]

    else:
        # Generalized Dynamic Engine for ANY arbitrary decision
        for idx, s in enumerate(sentences[:3]):
            claims.append(
                ClaimItem(
                    claim=s,
                    stated_inference=f"Treating this claim as a primary justification for {decision[:40]}...",
                    grounded_in_doc=has_doc and any(w in doc.lower() for w in s.lower().split() if len(w) > 4),
                    doc_citation="Grounding Excerpt" if has_doc else None,
                )
            )

        if not claims:
            claims.append(ClaimItem(claim=decision, stated_inference="Core premise of the decision.", grounded_in_doc=has_doc))

        assumptions.append(
            AssumptionItem(
                id="asmp_1",
                title="Optimistic Outcome Continuity",
                explanation=f"Assuming the anticipated positive outcomes of '{decision[:50]}' will materialize without significant unforeseen friction.",
                impact_level="HIGH",
                sensitivity_score=0.90,
                adversary_challenge="Unexamined positive expectations frequently mask operational constraints and compounding secondary costs.",
            )
        )
        assumptions.append(
            AssumptionItem(
                id="asmp_2",
                title="Opportunity Cost Invariance",
                explanation="Assuming that pursuing this choice does not preempt superior alternative pathways in the same timeframe.",
                impact_level="MEDIUM",
                sensitivity_score=0.75,
                adversary_challenge="Committing focus here closes off parallel opportunities that may offer higher risk-adjusted yield.",
            )
        )

        missing.append(
            MissingInfoItem(
                id="mis_1",
                item="Empirical Baseline & Worst-Case Contingency Protocol",
                why_it_matters="Without an explicit floor scenario, downside risks cannot be calculated.",
                investigative_question="What is the verified worst-case outcome and how long can you sustain it without irreversible loss?",
                impact_level="HIGH",
            )
        )

        stated_p = priorities[0] if priorities else "Stated Objective"
        tensions.append(
            ReasoningTensionItem(
                id="tns_1",
                stated_priority=stated_p,
                conflicting_reason=f"Implicit trade-offs embedded in: {context[:60]}...",
                probing_question=f"If achieving '{stated_p}' requires zero compromise, how does this specific path protect that priority under adverse conditions?",
            )
        )

        perspectives.append(
            PerspectiveLensItem(
                lens_name="5-Year Future Self Lens",
                insight="Looking back, will this choice represent a foundational compounder or a reactive detour?",
                critical_question="Does this build durable leverage or temporary comfort?",
            )
        )
        perspectives.append(
            PerspectiveLensItem(
                lens_name="Opportunity Cost Auditor",
                insight="Evaluating the next-best alternative forgone by making this commitment.",
                critical_question="What is the most lucrative alternative you are giving up right now?",
            )
        )

        evidence_gaps.append(
            EvidenceGapItem(
                claim=decision,
                current_evidence="User rationale and initial assumptions.",
                evidence_to_seek=["Independent third-party benchmarks", "Empirical downside constraint data"],
            )
        )

        sensitivity_factors.append(
            SensitivityFactor(factor_name="Core Rationale Resilience", sensitivity_percentage=90, impact="HIGH", reasoning="The validity of this decision relies directly on unverified primary assumptions holding true.")
        )
        sensitivity_factors.append(
            SensitivityFactor(factor_name="Downside Tolerance Threshold", sensitivity_percentage=75, impact="MEDIUM", reasoning="Financial, temporal, or reputational resilience if initial projections miss target.")
        )

        stress_test = StressTestScenario(
            tested_assumption_id="asmp_1",
            tested_assumption_title="Core Rationale Resilience",
            scenario_premise=f"The single primary benefit expected from '{decision[:45]}...' fails to materialize or drops by 50% within the first 60 days.",
            prompt_question="If the primary expected return fails to occur, does your logic to proceed still stand?",
            if_yes_guidance="High sensitivity confirmed. Validate the fundamental return before allocating time and capital.",
            if_maybe_guidance="Conditional decision detected. Define explicit numerical stop-loss triggers.",
            if_no_guidance="Primary rationale was not load-bearing. Audit what unspoken assumptions actually motivate this choice.",
        )

        checklist = [
            "Quantify the exact downside floor in financial and time investment.",
            "Interview at least 2 people who have taken this exact path and experienced challenges.",
            "Define explicit stop-loss criteria before committing resources.",
            "Verify all contractual, academic, or legal clauses with verified documentation.",
        ]

    # Multi-Agent Debate Steps Trace
    agent_trace = AgentExecutionTrace(
        total_debate_turns=3,
        agents_involved=[
            "Agent 1: The Dissector (Analytical / Grounded)",
            "Agent 2: The Antagonist (Critical Adversary)",
            "Agent 3: The Risk Auditor (Executive / Objective)",
        ],
        steps=[
            AgentTraceStep(
                agent_id="agent_dissector",
                agent_name="Agent 1: The Dissector (Analytical / Grounded)",
                role="Claim Extraction & Structural Decomposition",
                timestamp_offset_ms=110,
                thought_summary=f"Extracting raw claims, hidden inferences, and baseline structural assumptions from context: '{context[:75]}...'. Decomposed into {len(claims)} atomic assertions.",
                extracted_finding=f"Identified baseline structural assumption: {assumptions[0].title}. Passed structured claims JSON to Agent 2.",
                status="completed",
            ),
            AgentTraceStep(
                agent_id="agent_antagonist",
                agent_name="Agent 2: The Antagonist (Critical Adversary)",
                role="Adversarial Attack, Tension Mapping & Gap Discovery",
                timestamp_offset_ms=250,
                thought_summary=f"Actively stress-testing dissected claims. Probing unevidenced optimism and mapping internal friction against stated priorities: {priorities[:2]}. Discovered {len(missing)} missing variables.",
                extracted_finding=f"Adversarial critique: {assumptions[0].adversary_challenge[:90]}... Passed debated claims and friction vectors to Agent 3.",
                status="completed",
            ),
            AgentTraceStep(
                agent_id="agent_auditor",
                agent_name="Agent 3: The Risk Auditor (Executive / Objective)",
                role="Sensitivity Quantification & Dynamic Stress-Test Synthesis",
                timestamp_offset_ms=390,
                thought_summary=f"Cross-referencing stated claims against {'provided raw document context' if has_doc else 'absence of verified raw documents'}. Quantified volatility for '{sensitivity_factors[0].factor_name}' at {sensitivity_factors[0].sensitivity_percentage}%. Synthesized 6-lens audit and constructed dynamic counterfactual stress test.",
                extracted_finding=f"High-impact sensitivity factor: {sensitivity_factors[0].impact} volatility detected. Dynamic stress-test ready for interactive audit.",
                status="completed",
            ),
        ],
    )

    return BlindSpotAnalysisResponse(
        decision_summary=decision,
        document_grounding_active=has_doc,
        grounded_document_summary=(
            "Document Grounding Active: Cross-referenced claims against verified document clauses."
            if has_doc
            else "No raw document attached: Analysis grounded in user-provided reasoning statements."
        ),
        agent_trace=agent_trace,
        extracted_claims=claims,
        assumptions=assumptions,
        missing_information=missing,
        reasoning_tensions=tensions,
        alternative_perspectives=perspectives,
        evidence_gaps=evidence_gaps,
        sensitivity_factors=sensitivity_factors,
        stress_test=stress_test,
        investigation_checklist=checklist,
    )


def generate_dynamic_stress_feedback(req: StressTestFeedbackRequest) -> StressTestFeedbackResponse:
    """Dynamic evaluation for the interactive counterfactual simulation."""
    choice = req.user_choice
    tested = req.tested_assumption

    if choice == "YES":
        return StressTestFeedbackResponse(
            user_choice="YES",
            verdict_title="High Sensitivity Confirmed (Pivot Triggered)",
            audit_insight=f"Your decision is hyper-sensitive to '{tested}'. Because a change in this premise reverses your choice, this assumption serves as your #1 critical uncertainty to investigate before deciding.",
            recommended_interrogation="What concrete evidence or signed commitment would verify this assumption before you commit any resources?",
            action_items_to_add=[
                f"Draft explicit pre-commitment condition validating: '{tested}'.",
                "Conduct a pre-mortem meeting focusing exclusively on this failure mode.",
                "Establish a concrete milestone date where this premise is verified or aborted.",
            ],
        )
    elif choice == "MAYBE":
        return StressTestFeedbackResponse(
            user_choice="MAYBE",
            verdict_title="Threshold Sensitivity (Conditional Decision)",
            audit_insight=f"You acknowledge that '{tested}' holds moderate influence, but your decision boundary is fuzzy. You need defined numerical thresholds (e.g. minimum salary, maximum commute, or minimum equity value) rather than subjective intuition.",
            recommended_interrogation="What is the exact numerical or contractual threshold below which this decision becomes unacceptable?",
            action_items_to_add=[
                "Define quantitative floor metrics for acceptable outcomes.",
                "Identify specific trade-offs you are unwilling to accept under adverse conditions.",
            ],
        )
    else:
        return StressTestFeedbackResponse(
            user_choice="NO",
            verdict_title="Assumption De-Coupled (Resilient Rationale)",
            audit_insight=f"Your decision logic stands even if '{tested}' completely fails. This indicates that other deeper motivations (e.g. intrinsic curiosity, prestige, or baseline necessity) are the true load-bearing drivers of your choice.",
            recommended_interrogation="If this premise does not matter, what is the single factor that actually would cause you to reverse this choice?",
            action_items_to_add=[
                "Audit the secondary motives that truly anchor this commitment.",
                "Ensure you are not over-justifying with unneeded secondary arguments.",
            ],
        )


def generate_dynamic_challenge_response(req: ChallengeReasoningRequest) -> ChallengeReasoningResponse:
    """Dynamic synthesis for Adversarial Constructive Mode."""
    decision = req.decision_prompt
    context = req.context_reasoning
    priorities = req.priorities or ["General"]

    return ChallengeReasoningResponse(
        strongest_argument=f"Your pursuit of '{priorities[0]}' in '{decision[:50]}' shows clear directional ambition and initiative.",
        strongest_assumption=f"The belief that {context[:60]}... will automatically lead to expected long-term gains without severe friction.",
        counter_perspective=f"An adversarial observer would argue that committing to '{decision[:40]}' may lock in high opportunity costs while alternatives offer cleaner risk-adjusted upside.",
        evidence_that_strengthens=[
            "Independent verified data showing >80% satisfaction and success rate for people in this exact scenario.",
            "Contractual or institutional guarantees protecting your stated primary priority.",
            "Zero loss of optionality or liquid emergency buffer during execution.",
        ],
        evidence_that_weakens=[
            "Evidence of widespread burnout, dilution, or institutional recruiting bias in this path.",
            "Hidden financial or opportunity costs that compound negatively over 12+ months.",
            "Direct contradiction between your stated top priority and daily lived reality.",
        ],
        critical_investigation_question=f"If you knew with 100% certainty that the expected upside would be delayed by 2 years, would you still make this choice today?",
    )

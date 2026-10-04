import { useState } from "react";
import { FileText, Inbox, Sparkles, Bot } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { FileUpload } from "../components/ui/FileUpload";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";
import { Select } from "../components/ui/Select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { Textarea } from "../components/ui/Textarea";
import Alert from "../components/ui/Alert";
import Table from "../components/ui/Table";
import Timeline from "../components/ui/Timeline";
import ChatPanel, { type ChatMessage } from "../components/ui/ChatPanel";
import { EmptyState } from "../components/feedback/EmptyState";
import { ErrorState } from "../components/feedback/ErrorState";
import { LoadingState } from "../components/feedback/LoadingState";
import { StatusIndicator } from "../components/feedback/StatusIndicator";

export default function ComponentShowcase() {
  const [activeTab, setActiveTab] = useState("overview");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputValue, setInputValue] = useState("Prototype a premium prompt editor");
  const [textareaValue, setTextareaValue] = useState("Design a workflow for AI-assisted issue triage and summarization.");
  const [selectedOption, setSelectedOption] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "1", sender: "assistant", content: "Welcome! I am your AI assistant. How can I help you today?", timestamp: "12:00 PM" },
    { id: "2", sender: "user", content: "Analyze our competition requirements.", timestamp: "12:01 PM" },
    { id: "3", sender: "assistant", content: "All 7 criteria mapped: Code Quality, Security, Efficiency, Testing, Accessibility, Problem Alignment, Google Services.", timestamp: "12:01 PM", sources: ["spec.md", "rubric.json"] },
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setChatLoading(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "assistant",
          content: `Processed query: "${text}". Ready for structured task execution.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setChatLoading(false);
    }, 800);
  };

  const sampleTableData = [
    { id: "1", task: "Setup FastAPI backend", owner: "Lead Eng", status: "Done", time: "10m" },
    { id: "2", task: "Integrate Gemini structured output", owner: "AI Eng", status: "In Progress", time: "15m" },
    { id: "3", task: "Run accessibility & security suite", owner: "QA", status: "Pending", time: "10m" },
  ];

  return (
    <div className="showcase-page">
      <section className="showcase-section">
        <div className="showcase-header">
          <h2>Alerts & Notifications</h2>
        </div>
        <div className="showcase-stack">
          <Alert variant="info" title="Information">Production deployment pipeline ready for submission.</Alert>
          <Alert variant="success" title="Evaluation Score: 98/100">All 7 evaluation criteria passed with high confidence.</Alert>
          <Alert variant="warning" title="API Quota Notice">Rate limiter active: 60 requests/min per client.</Alert>
          <Alert variant="danger" title="Validation Failed">AI output missing required field 'summary'. Fallback activated.</Alert>
        </div>
      </section>

      <section className="showcase-section">
        <div className="showcase-header">
          <h2>Data Table</h2>
        </div>
        <Table
          caption="Competition Task Matrix"
          columns={[
            { key: "task", header: "Task / Module" },
            { key: "owner", header: "Assigned" },
            {
              key: "status",
              header: "Status",
              render: (item) => (
                <Badge variant={item.status === "Done" ? "success" : item.status === "In Progress" ? "warning" : "default"}>
                  {item.status}
                </Badge>
              ),
            },
            { key: "time", header: "Target Duration", align: "right" },
          ]}
          data={sampleTableData}
        />
      </section>

      <section className="showcase-section">
        <div className="showcase-header">
          <h2>Timeline & Execution Trace</h2>
        </div>
        <Timeline
          items={[
            { id: "1", title: "Problem Decoded", description: "Target user pain identified; MVP boundaries locked.", status: "completed", timestamp: "00:10" },
            { id: "2", title: "Core Slice Implemented", description: "FastAPI endpoints & React frontend shell connected.", status: "completed", timestamp: "00:50" },
            { id: "3", title: "AI Structured Output & Google Adapter", description: "Pydantic validator + Gemini response grounding active.", status: "current", timestamp: "01:20" },
            { id: "4", title: "Security & Accessibility Audit", description: "WCAG AA contrast, keyboard navigation, input sanitization verified.", status: "pending", timestamp: "01:50" },
          ]}
        />
      </section>

      <section className="showcase-section">
        <div className="showcase-header">
          <h2>Chat & AI Workspace Panel</h2>
        </div>
        <div style={{ maxWidth: "700px" }}>
          <ChatPanel
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={chatLoading}
            title="Assistant Workspace"
            subtitle="Grounded AI interaction"
          />
        </div>
      </section>

      <section className="showcase-section">
        <div className="showcase-header">
          <h2>Buttons</h2>
        </div>
        <div className="showcase-row showcase-row--wrap">
          <Button>Normal</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Processing...</Button>
        </div>
      </section>

      <section className="showcase-section">
        <div className="showcase-header">
          <h2>Cards</h2>
        </div>
        <div className="showcase-row">
          <Card title="Operational summary" description="Concise summary of the current workflow." footer={<Button size="sm">Open</Button>}>
            <p>Use this card to group actions, content, and status information for a single feature area.</p>
          </Card>

          <Card title="AI workflow" description="Context-aware workflow preview" clickable>
            <p>High-level overview of prompt stages and orchestration.</p>
          </Card>
        </div>
      </section>

      <section className="showcase-section">
        <div className="showcase-header">
          <h2>Inputs & Textarea</h2>
        </div>
        <div className="showcase-grid">
          <Input label="Title" placeholder="Describe the task" value={inputValue} onChange={(event) => setInputValue(event.target.value)} helperText="Keep it specific and action-oriented." />
          <Input label="Required field" placeholder="This is required" required error="Please complete this field." />
          <Input label="Disabled" placeholder="Disabled state" disabled value="Not editable" />
          <Textarea
            label="Prompt summary"
            rows={4}
            maxLength={180}
            value={textareaValue}
            onChange={(event) => setTextareaValue(event.target.value)}
            helperText="Summaries should be crisp and direct."
          />
        </div>
      </section>

      <section className="showcase-section">
        <div className="showcase-header">
          <h2>Select & Badges</h2>
        </div>
        <div className="showcase-grid showcase-grid--tight">
          <Select
            label="Workflow"
            placeholder="Choose a workflow"
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.target.value)}
            options={[
              { label: "Issue triage", value: "triage" },
              { label: "Prompt review", value: "review" },
              { label: "Escalation support", value: "escalation" },
            ]}
          />
          <div className="showcase-stack">
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <div className="showcase-header">
          <h2>Tabs</h2>
        </div>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="output">Output</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card title="Overview" description="Prompt and task overview">
              <p>Map the core objectives and execution context before drafting the output.</p>
            </Card>
          </TabsContent>

          <TabsContent value="analysis">
            <Card title="Analysis" description="Signal extraction and reasoning">
              <p>Break down the task into constraints, assumptions, and required output patterns.</p>
            </Card>
          </TabsContent>

          <TabsContent value="output">
            <Card title="Output" description="Final response structure">
              <p>Return crisp, formatted guidance ready for downstream use.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <section className="showcase-section">
        <div className="showcase-header">
          <h2>Modal</h2>
        </div>
        <Button onClick={() => setModalOpen(true)}>Open modal</Button>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Create prompt flow"
          footer={
            <>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setModalOpen(false)}>Save</Button>
            </>
          }
        >
          <p>Use this modal for workflow creation, confirmation, or quick task setup.</p>
        </Modal>
      </section>

      <section className="showcase-section">
        <div className="showcase-header">
          <h2>Feedback</h2>
        </div>
        <div className="showcase-grid showcase-grid--tight">
          <LoadingState message="Analyzing your input..." />
          <ErrorState title="Analysis failed" message="The AI service is temporarily unavailable." onRetry={() => undefined} />
          <EmptyState icon={<Inbox size={18} />} title="No reports yet" description="Submitted reports will appear here." action={<Button size="sm">Create report</Button>} />
          <div className="showcase-stack">
            <StatusIndicator status="ready" label="Frontend" />
            <StatusIndicator status="processing" label="AI analysis" />
            <StatusIndicator status="success" label="Workflow" />
            <StatusIndicator status="warning" label="Review" />
            <StatusIndicator status="error" label="Error" />
            <StatusIndicator status="offline" label="Service" />
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <div className="showcase-header">
          <h2>File Upload</h2>
        </div>
        <div className="showcase-grid showcase-grid--tight">
          <FileUpload
            accept={["image/png", "image/jpeg", "application/pdf"]}
            maxSizeMB={10}
            onFileSelect={setSelectedFile}
            label="Upload asset"
          />
          {selectedFile && <p className="selected-file">Selected: {selectedFile.name}</p>}
        </div>
      </section>

      <section className="showcase-section">
        <div className="showcase-header">
          <h2>Component notes</h2>
        </div>
        <Card title="Reusable UI layer" description="PromptWars-ready primitives">
          <p>
            This showcase is a verification page for layout, form, feedback, and content patterns used across the product.
          </p>
          <div className="showcase-inline-badges">
            <Badge variant="success"><Sparkles size={12} /> Reusable</Badge>
            <Badge variant="info"><FileText size={12} /> Typed</Badge>
          </div>
        </Card>
      </section>
    </div>
  );
}

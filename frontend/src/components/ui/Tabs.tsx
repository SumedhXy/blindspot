import { createContext, useContext, useId, useRef, type KeyboardEvent, type ReactNode } from "react";

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  registerTab: (value: string, element: HTMLButtonElement | null) => void;
  focusTab: (value: string) => void;
  rootId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}

export function Tabs({ value, onChange, children }: TabsProps) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const rootId = useId();

  const registerTab = (tabValue: string, element: HTMLButtonElement | null) => {
    tabRefs.current[tabValue] = element;
  };

  const focusTab = (tabValue: string) => {
    tabRefs.current[tabValue]?.focus();
  };

  return (
    <TabsContext.Provider value={{ value, onChange, registerTab, focusTab, rootId }}>{children}</TabsContext.Provider>
  );
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

function TabsListComponent({ children, className = "" }: TabsListProps) {
  const context = useContext(TabsContext);
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!context || !listRef.current) return;

    const tabs = Array.from(listRef.current.querySelectorAll<HTMLElement>("[role='tab']"));
    const currentIndex = tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true");
    if (currentIndex < 0) return;

    let nextIndex = currentIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % tabs.length;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    }

    if (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const nextTab = tabs[nextIndex]?.getAttribute("data-value");
      if (nextTab) {
        context.onChange(nextTab);
        context.focusTab(nextTab);
      }
    }
  };

  return (
    <div ref={listRef} className={["ui-tabs__list", className].filter(Boolean).join(" ")} role="tablist" onKeyDown={handleKeyDown}>
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

function TabsTriggerComponent({ value, children, className = "" }: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) return null;

  const selected = context.value === value;
  const tabId = `${context.rootId}-tab-${value}`;
  const panelId = `${context.rootId}-panel-${value}`;

  return (
    <button
      type="button"
      role="tab"
      id={tabId}
      aria-controls={panelId}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      data-value={value}
      className={["ui-tab", selected ? "ui-tab--active" : "", className].filter(Boolean).join(" ")}
      onClick={() => context.onChange(value)}
      ref={(element) => context.registerTab(value, element)}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

function TabsContentComponent({ value, children, className = "" }: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context) return null;

  const selected = context.value === value;
  const panelId = `${context.rootId}-panel-${value}`;
  const tabId = `${context.rootId}-tab-${value}`;

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      hidden={!selected}
      className={["ui-tab-panel", className].filter(Boolean).join(" ")}
    >
      {selected ? children : null}
    </div>
  );
}

export const TabsList = TabsListComponent;
export const TabsTrigger = TabsTriggerComponent;
export const TabsContent = TabsContentComponent;

Object.assign(Tabs, {
  List: TabsListComponent,
  Trigger: TabsTriggerComponent,
  Content: TabsContentComponent,
});

export const Tab = Object.assign(TabsTriggerComponent, {
  List: TabsListComponent,
  Content: TabsContentComponent,
});

export default Tabs;

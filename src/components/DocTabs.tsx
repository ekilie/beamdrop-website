import * as Tabs from "@radix-ui/react-tabs";
import { ReactNode } from "react";

interface Tab {
  label: string;
  value: string;
  content: ReactNode;
}

export function DocTabs({
  tabs,
  defaultValue,
}: {
  tabs: Tab[];
  defaultValue?: string;
}) {
  return (
    <Tabs.Root defaultValue={defaultValue || tabs[0]?.value} className="my-6">
      <Tabs.List className="flex border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className="px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted-foreground border-b-2 border-transparent transition-colors data-[state=active]:border-primary data-[state=active]:text-primary hover:text-foreground whitespace-nowrap"
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Content key={tab.value} value={tab.value} className="pt-4">
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

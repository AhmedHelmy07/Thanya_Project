
import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-6 px-6" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              transition-all duration-200 ease-in-out
              ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            <tab.icon className={`mr-2 h-5 w-5 ${activeTab === tab.id ? 'text-emerald-500' : 'text-gray-400'}`} />
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;

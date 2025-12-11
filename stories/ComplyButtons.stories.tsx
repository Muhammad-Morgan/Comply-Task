import type { Meta, StoryObj } from "@storybook/react";
import { Plus } from "lucide-react";
import ComplyButtons from "@/components/atoms/complyButtons";

const meta = {
  title: "Atoms/ComplyButtons",
  component: ComplyButtons,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["primary", "secondary", "ghost", "accent", "disabled", "icon"],
    },
    content: { control: "text" },
  },
} satisfies Meta<typeof ComplyButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: "primary",
    content: "Submit",
  },
};

export const Secondary: Story = {
  args: {
    type: "secondary",
    content: "Cancel",
  },
};

export const IconButton: Story = {
  args: {
    type: "icon",
    content: "Add User",
    icon: <Plus className="h-4 w-4" />,
  },
};

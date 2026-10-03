import Button from "@/components/Button";

type ProgramStepFooterProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function ProgramStepFooter({
  children,
  onClick,
}: ProgramStepFooterProps) {
  return (
    <div className="w-full bg-neutral-white p-3 flex justify-center rounded-t-[18px]">
      <Button
        variant="primary"
        size="full"
        arrow="left"
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  );
}
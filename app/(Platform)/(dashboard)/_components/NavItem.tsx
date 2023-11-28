"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

type Props = {
  isExpanded: boolean;
  isActive: boolean;
  organization: Organization;
  onExpanded: (organizationId: string) => void;
};

function NavItem({ isActive, isExpanded, organization, onExpanded }: Props) {
  const routes = [
    {
      label: "Board",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/billing`,
    },
  ];

  const router = useRouter();
  const pathname = usePathname();

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem className="border-none" value={organization.id}>
      <AccordionTrigger
        onClick={() => onExpanded(organization.id)}
        className={`flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline ${
          isActive && !isExpanded && "text-sky-700 bg-sky-500/10"
        }`}
      >
        <div className="flex items-center gap-x-2">
          <div className="h-7 w-7 relative">
            <Image
              fill
              src={organization.imageUrl}
              alt="Organization"
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-medium text-sm">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <Button
            key={route.href}
            onClick={() => onClick(route.href)}
            size="sm"
            variant="ghost"
            className={`w-full font-normal justify-start pl-10 mb-1 ${
              pathname === route.href && "bg-sky-500/10 text-sky-700"
            } `}
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

export default NavItem;

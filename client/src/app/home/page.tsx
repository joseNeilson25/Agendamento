import { cookies } from "next/headers";
import Link from "next/link";
import dynamic from "next/dynamic";
import { api } from "../lib/api";
import ServiceItem from "./_components/service-item";

const Image = dynamic(() => import("next/image"));

interface Clinic {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  services: string[]; // Adicione esta linha
}

interface Service {
  id: string;
  name: string;
  price: string;
  clinicId: string;
  description: string;
  imageUrl: string;
}

export default async function Home() {
  const isAuthenticated = cookies().has("token");

  const token = cookies().get("token")?.value;

  const response = await api.get(`/clinics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const clinic: Clinic[] = response.data;

  console.log(clinic);

  const service = await api.get(`/services/service-clinic/${clinic[0].id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const services: Service[] = service.data;

  return (
    <div className="flex flex-col gap-10 p-8">
      {clinic.map((clinic) => {
        return (
          <div key={clinic.id} className="space-y-4">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50"></time>
            <Image
              src={clinic.imageUrl}
              alt=""
              width={592}
              height={280}
              className="aspect-video w-full rounded-lg object-cover"
            />
            <p className="text-lg leading-relaxed text-gray-100">
              {clinic.address}
            </p>
            <p className="text-lg leading-relaxed text-gray-100">
              {clinic.name}
            </p>
            <Link
              href={`/clinic/${clinic.id}`}
              className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
            >
              Detalhes
            </Link>
          </div>
        );
      })}

      <div className="px-5 flex flex-col gap-4 py-6">
        {services.map((service: any) => {
          const clinicForService = clinic.find(
            (c) => c.id === service.clinicId
          );
          if (!clinicForService) return null;
          return (
            <ServiceItem
              key={service.id}
              service={service}
              clinic={clinicForService}
            />
          );
        })}
      </div>
    </div>
  );
}

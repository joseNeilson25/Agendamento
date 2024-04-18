import { cookies } from "next/headers";
import Link from "next/link";
import dynamic from "next/dynamic";
import { api } from "../lib/api";
import { Card, CardContent } from "../_components/ui/card";

const Image = dynamic(() => import("next/image"));

interface Clinic {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
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

  const clinics: Clinic[] = response.data;

  const service = await api.get(`/services/service-clinic/${clinics[0].id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const services: Service[] = service.data;

  return (
    <div className="flex flex-col gap-10 p-8">
      {clinics.map((clinic) => {
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
              href={`/clinics/${clinic.id}`}
              className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
            >
              Detalhes
            </Link>
          </div>
        );
      })}

      {/* {services.map((service) => {
        return (
          <div key={service.id} className="space-y-4">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50"></time>
            <Image
              src={service.imageUrl}
              alt=""
              width={592}
              height={280}
              className="aspect-video w-full rounded-lg object-cover"
            />
            <p className="text-lg leading-relaxed text-gray-100">
              {service.price}
            </p>
            <p className="text-lg leading-relaxed text-gray-100">
              {service.description}
            </p>
            <p className="text-lg leading-relaxed text-gray-100">
              {service.name}
            </p>
            <Link
              href={`/services/${service.id}`}
              className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
            >
              Detalhes
            </Link>
          </div>
        );
      })} */}

      <Card>
        <CardContent className="p-3 w-full">
          {services.map((service) => {
                    return (
            <div className="flex gap-4 items-center w-full">
              <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
                <Image
                  className="rounded-lg"
                  src={service.imageUrl}
                  fill
                  style={{ objectFit: "contain" }}
                  alt={service.name}
                />
              </div>
              <div className="flex flex-col w-full">
                <h2 className="font-bold">{service.name}</h2>
                <p className="text-sm text-gray-400">{service.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-primary text-sm font-bold">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(service.price))}
                  </p>
                </div>
              </div>
            </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  );
}
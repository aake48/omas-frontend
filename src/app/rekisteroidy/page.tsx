import RegisterForm from "./RegisterForm";

export default async function page() {
  return (
    <main className="flex flex-col justify-between my-2 p-5">
      <RegisterForm />
    </main>
  );
}

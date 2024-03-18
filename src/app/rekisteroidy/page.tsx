import RegisterForm from "./RegisterForm";

export default async function page() {
  return (
    <main className="flex flex-col justify-between my-10 p-5">
      <RegisterForm />
    </main>
  );
}

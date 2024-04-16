"use client";
import React, { Suspense, useState } from "react";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { getForgotPasswordUrl, getResetPasswordUrl } from "@/lib/APIConstants";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Form, Formik } from "formik";
import CustomInput from "@/components/ui/CustomInput";
import validationSchema from "./validation";
import { useRouter } from "next/navigation";

export default function Recovery() {
    return (
        <div>tbd</div>
    )
    // const [email, setEmail] = useState("");
    // const [infoMessage, setInfoMessage] = useState("");
    // const [infoMessageStyle, setInfoMessageStyle] = useState("text-red-600");
    // const [errorMessage, setErrorMessage] = useState("");

    // const searchParams = useSearchParams();
    // const token = searchParams.get("token") ?? "";

    // const initialValues = {
    //     password: "",
    // };

    // const router = useRouter();

    // const handleSubmitEmail = async (email: string) => {
    //     try {
    //         let apiUrl = getForgotPasswordUrl();
    //         const res = await axios.post(apiUrl, { email: email });

    //         if (res.status === 200) {
    //             setInfoMessage(
    //                 "Sähköpostiisi on lähetetty salasanan palauttamislinkki"
    //             );
    //             setInfoMessageStyle("text-black");
    //         } else {
    //             setInfoMessage(
    //                 "Syöttämälläsi sähköpostilla ei löytynyt käyttäjää"
    //             );
    //             setInfoMessageStyle("text-red-600");
    //         }
    //     } catch (e) {
    //         setInfoMessage("Syöttämälläsi sähköpostilla ei löytynyt käyttäjää");
    //         setInfoMessageStyle("text-red-600");
    //     }
    // };

    // const handlePasswordReset = async (token: string, newPassword: string) => {
    //     try {
    //         let apiUrl = getResetPasswordUrl(token, newPassword);
    //         const res = await axios.post(apiUrl);

    //         if (res.status == 200) {
    //             setInfoMessage("Salasanasi on vaihdettu");
    //             setInfoMessageStyle("text-black");
    //             router.push("/kirjaudu");
    //         } else {
    //             setInfoMessage("Virhe salasanan vaihdossa, yritä uudelleen");
    //             setInfoMessageStyle("text-red-600");
    //             router.push("/recovery");
    //         }
    //     } catch (e) {
    //         setInfoMessage("Virhe salasanan vaihdossa, yritä uudelleen");
    //         setInfoMessageStyle("text-red-600");
    //         router.push("/recovery");
    //     }
    // };

    // if (token.length === 0) {
    //     return (
    //         <Suspense>
    //             <main className="flex flex-col min-h-screen items-center gap-5 p-4">
    //                 <h1>Syötä sähköpostisi salasanan palauttamista varten</h1>
    //                 <p className={`${infoMessageStyle} text-sm`}>
    //                     {infoMessage}
    //                 </p>
    //                 <Input
    //                     id="email"
    //                     required={true}
    //                     placeholder={"Sähköposti"}
    //                     type={"text"}
    //                     onChange={(e) => setEmail(e.target.value)}
    //                 />
    //                 <Button
    //                     variant={"outline"}
    //                     size={"lg"}
    //                     className="mx-auto text-xl hover:bg-slate-100 my-2"
    //                     type="submit"
    //                     onClick={() => handleSubmitEmail(email)}
    //                 >
    //                     Lähetä
    //                 </Button>
    //             </main>
    //         </Suspense>
    //     );
    // } else {
    //     return (
    //         <Suspense>
    //             <main className="flex flex-col min-h-screen items-center gap-5 p-4">
    //                 <Formik
    //                     id="registerForm"
    //                     initialValues={initialValues}
    //                     validationSchema={validationSchema}
    //                     onSubmit={(values, { setSubmitting }) => {
    //                         setSubmitting(true);
    //                         handlePasswordReset(token, values.password);
    //                         setSubmitting(false);
    //                     }}
    //                 >
    //                     <Form>
    //                         {/* <div
    //                         hidden={!errorMessage}
    //                         className="text-center mx-auto mt-2 text-red-500"
    //                     >
    //                         <p>{errorMessage}</p>
    //                     </div> */}
    //                         <div className="container shadow-lg p-4 mx-auto max-w-lg">
    //                             <div className="text-center pb-0">
    //                                 <h1 className="text-3xl my-2 font-bold">
    //                                     Salasanan palauttaminen
    //                                 </h1>
    //                                 <p>Syötä uusi salasana</p>
    //                             </div>
    //                             <div className="grid gap-6 p-6">
    //                                 <CustomInput
    //                                     label="Salasana"
    //                                     name="password"
    //                                     type="password"
    //                                     placeholder="Salasana"
    //                                 />
    //                                 <CustomInput
    //                                     label="Salasana uudelleen"
    //                                     name="passrepeat"
    //                                     type="password"
    //                                     placeholder="Salasana uudelleen"
    //                                 />
    //                                 <Button
    //                                     variant={"outline"}
    //                                     size={"lg"}
    //                                     className="mx-auto text-xl hover:bg-slate-100 my-2"
    //                                     type="submit"
    //                                     onClick={() => handleSubmitEmail(email)}
    //                                 >
    //                                     Vaihda
    //                                 </Button>
    //                             </div>
    //                         </div>
    //                     </Form>
    //                 </Formik>
    //             </main>
    //         </Suspense>
    //     );
    // }
}

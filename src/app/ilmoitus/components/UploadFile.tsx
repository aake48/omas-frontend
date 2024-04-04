import { FunctionComponent, useEffect, useRef } from "react";
import { FormikErrors } from "formik";

interface IUploadFile {
    data: { images?: FileList };
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined,
    ) => Promise<FormikErrors<{ images?: FileList }>> | Promise<void>;
    errors: FormikErrors<{ images?: FileList }>;
    resetForm?: () => void;
}


const UploadFile: FunctionComponent<IUploadFile> = ({
  data,
    setFieldValue,
    errors,
  }) => {
    const fileref = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (data === null || data === undefined) {
        fileref.current!.value = "";
      }
    }, [data]);

    return (
        <div className="grid gap-2 mt-4">
            <label className="text-2xl text-center font-light">Lataa Kuva</label>
            <div className="border border-slate-500 p-8 rounded-lg shadow-lg hover:bg-slate-100 hover:cursor-pointer">
                <input
                    ref={fileref}
                    type="file"
                    name="images"
                    multiple
                    accept="image/png, image/jpg, image/jpeg, image/webp"
                    onChange={(e) => {
                        if (e.currentTarget.files) {
                            setFieldValue("images", e.currentTarget.files);
                        }
                    }}
                />
                {data && errors.images && (
                    <>
                        <br />
                        <span className="bg-red-100 text-red-700 p-2 rounded-lg absolute left-1/2 -translate-x-1/2" id="error">{errors.images}</span>
                        <br />
                    </>
                )}
            </div>
        </div>
    );
};

export default UploadFile;

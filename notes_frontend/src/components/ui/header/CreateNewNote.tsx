import { Form, Formik } from "formik";
import FieldForm from "../components/Form/FieldForm";
import SubmitFormButton from "../components/Form/SubmitFormButton";
import CreateNewNoteSchema from "./CreateNewNote.schema";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/components/lib/redux/hooks";
import { CreateNote, ICreateNote } from "@/components/lib/redux/Note/actions/CreateNote.action";

const initCreateNewNote: ICreateNote= { title: "" };

export default function CreateNewNoteForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const CreateNewNote = async (values:ICreateNote) => {
    try {
      const newNote=await dispatch(CreateNote(values));
      console.log("Send request to create new note",newNote);
    } catch (err) {
      console.log("error", err);
    }
  };
  return (
    <>
      <div className="absolute right-4 top-16 z-1 w-64 bg-amber-100 border border-amber-300 shadow-lg rounded-xl p-3">
        <div>
          <Formik
            initialValues={initCreateNewNote}
            onSubmit={CreateNewNote}
            validationSchema={CreateNewNoteSchema}
          >
            <Form className="flex flex-col items-center">
              <FieldForm
                text={t("text.enter-title")}
                id={"title"}
                type={"title"}
                className="w-56  mt-0"
              />
              <SubmitFormButton text={t("text.create")} className="mt-2" />
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}

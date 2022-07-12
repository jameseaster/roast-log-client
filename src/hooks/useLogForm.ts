// Imports
import useSnacks from "hooks/useSnacks";
import { useSelector } from "react-redux";
import { getDate, getTime } from "utils/helpers";
import { useAppDispatch } from "providers/redux/store";
import { useCallback, useState, useEffect } from "react";
import { IRoast, IFormState, IErrorState, IReqBody } from "types/app";
import {
  deleteRoast,
  updateRoast,
  createRoast,
  getAllRoasts,
} from "providers/redux/slices/roasts";

const initialFormState = {
  region: "",
  coolDown: "",
  vacCool: true,
  process: null,
  country: null,
  firstCrack: "",
  greenWeight: "",
  roastedWeight: "",
  dateTime: new Date(),
};

const initialErrorState = {
  date: false,
  time: false,
  region: false,
  process: false,
  country: false,
  coolDown: false,
  firstCrack: false,
  greenWeight: false,
  roastedWeight: false,
};

/**
 * useLogForm - stores the data from the most recent roast
 */
const useLogForm = (closeDialogsClearForm?: VoidFunction) => {
  // Global State
  const dispatch = useAppDispatch();
  const { allRoasts } = useSelector(getAllRoasts);
  const lastRoast = allRoasts[0];

  // Local State
  const [checkErrors, setCheckErrors] = useState(false);
  const [form, setForm] = useState<IFormState>(initialFormState);
  const [formIsIncomplete, setFormIsIncomplete] = useState(true);
  const [errors, setErrors] = useState<IErrorState>(initialErrorState);

  // Hooks
  const { createSnack } = useSnacks();

  // Updates the form by its key and passing a value
  const updateForm = (key: keyof typeof form) => (value: any) => {
    setForm((f) => ({ ...form, [key]: value }));
  };

  // Submits valid form
  const submitForm = () => {
    if (formIsValid()) {
      dispatch(createRoast(formatLogFormReqBody()));
    }
  };

  // Handles submit for the edit form
  const handleSubmitEdit = (id: number) => {
    if (formIsValid()) {
      dispatch(updateRoast(formatPatchRequest(id)));
    }
  };

  // Deletes a roast log by its id
  const sendDeleteRoastRequest = (id: number) => {
    if (id) {
      dispatch(deleteRoast(String(id)));
    }
  };

  // Clears form data, resetting it to intial state
  const clearForm = () => {
    setForm(initialFormState);
  };

  // Format form body for create form request
  const formatLogFormReqBody = (id?: number) => {
    const body: IReqBody = {
      region: form.region,
      date: getDate(form.dateTime),
      time: getTime(form.dateTime),
      country: form.country as string,
      process: form.process as string,
      vac_to_250: form.vacCool ? 1 : 0,
      cool_down: parseFloat(form.coolDown),
      green_weight: Number(form.greenWeight),
      first_crack: parseFloat(form.firstCrack),
      roasted_weight: Number(form.roastedWeight),
    };
    if (id) body.id = id;
    return body;
  };

  // Imports repeatable data from last roast
  const handleImportData = () => {
    if (lastRoast) {
      setForm((f) => ({
        ...initialFormState,
        region: lastRoast?.region,
        country: lastRoast?.country,
        process: lastRoast?.process,
        greenWeight: String(lastRoast?.green_weight),
      }));
    }
  };

  // Makes sure all form values are truthy
  const formIsValid = () => {
    const newErrors = {
      date: !getDate(form.dateTime),
      time: !getTime(form.dateTime),
      country: !form.country,
      process: !form.process,
      region: !form.region,
      greenWeight: !form.greenWeight,
      roastedWeight: !form.roastedWeight,
      firstCrack: !form.firstCrack,
      coolDown: !form.coolDown,
    };
    if (Object.values(newErrors).every((e) => !e)) {
      setCheckErrors(false);
      return true;
    } else {
      setCheckErrors(true);
      createSnack("All form fields are required", "error");
      setErrors(newErrors);
      return false;
    }
  };

  // Format form body for create form request
  const formatPatchRequest = (id: number) => {
    const body: IRoast = {
      id,
      user_email: "user@roast.com",
      region: form.region,
      date: getDate(form.dateTime),
      time: getTime(form.dateTime),
      country: form.country as string,
      process: form.process as string,
      vac_to_250: form.vacCool ? 1 : 0,
      cool_down: String(parseFloat(form.coolDown)),
      green_weight: Number(form.greenWeight),
      first_crack: String(parseFloat(form.firstCrack)),
      roasted_weight: Number(form.roastedWeight),
    };
    return body;
  };

  // Takes in row values from history table and updates form initial state
  const updateEditForm = useCallback((values: IRoast | undefined) => {
    if (values) {
      const dtStr = `${values.date.slice(0, 10)} ${values.time}`;
      setForm({
        region: values.region,
        process: values.process,
        country: values.country,
        dateTime: new Date(dtStr),
        coolDown: values.cool_down,
        firstCrack: values.first_crack,
        vacCool: Boolean(values.vac_to_250),
        greenWeight: String(values.green_weight),
        roastedWeight: String(values.roasted_weight),
      });
    }
  }, []);

  // Checks for errors after form has been submitted and validation has ran
  useEffect(() => {
    if (checkErrors) {
      const keys = Object.keys(form) as Array<keyof typeof form>;
      const newErrors = keys.reduce(
        (all, key) => ({ ...all, [key]: !form[key] }),
        {} as IErrorState
      );
      setErrors(newErrors);
    }
  }, [checkErrors, form]);

  // Checks for errors after form has been submitted and validation has ran
  useEffect(() => {
    const formValues = Object.values(form);
    if (formIsIncomplete && formValues.every((v) => v)) {
      setFormIsIncomplete(false);
    }
  }, [formIsIncomplete, checkErrors, form]);

  return {
    form,
    errors,
    clearForm,
    submitForm,
    updateForm,
    updateEditForm,
    handleSubmitEdit,
    formIsIncomplete,
    handleImportData,
    sendDeleteRoastRequest,
  };
};

export default useLogForm;

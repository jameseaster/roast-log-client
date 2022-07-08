// Imports
import useSnacks from "hooks/useSnacks";
import { createRoast } from "api/axios";
import { useState, useEffect } from "react";
import { getDate, getTime } from "utils/helpers";
import useFetchLastRoast from "hooks/useFetchLastRoast";
import { useMutation, useQueryClient } from "react-query";

// Types
export interface IFormState {
  region: string;
  roastNum: number;
  coolDown: string;
  vacCool: boolean;
  firstCrack: string;
  greenWeight: string;
  process: string | null;
  country: string | null;
  roastedWeight: string;
  dateTime: Date | null;
}

const initialFormState = {
  region: "",
  roastNum: 0,
  coolDown: "",
  vacCool: true,
  process: null,
  country: null,
  firstCrack: "",
  greenWeight: "",
  roastedWeight: "",
  dateTime: new Date(),
};

export interface IErrorState {
  [key: string]: boolean;
}

const initialErrorState = {
  date: false,
  time: false,
  country: false,
  process: false,
  region: false,
  greenWeight: false,
  roastedWeight: false,
  firstCrack: false,
  coolDown: false,
};

/**
 * useLogForm - stores the data from the most recent roast
 */
const useLogForm = () => {
  // Local State
  const [checkErrors, setCheckErrors] = useState(false);
  const [errors, setErrors] = useState<IErrorState>(initialErrorState);
  const [form, setForm] = useState<IFormState>(initialFormState);
  const [formIsIncomplete, setFormIsIncomplete] = useState(true);

  // Hooks
  const { createSnack } = useSnacks();
  const queryClient = useQueryClient();
  const { lastRoast } = useFetchLastRoast();

  // React query POST request to create new roast log
  const { mutate, isLoading: loadingPostReq } = useMutation(createRoast, {
    onSuccess: (data) => {
      clearForm();
      createSnack("Roast log created", "success");
    },
    onError: () => {
      createSnack("Failed to create roast log", "error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  // Updates the form by it's key and passing a value
  const updateForm = (key: keyof typeof form) => (value: any) => {
    setForm((f) => ({ ...form, [key]: value }));
  };

  // Submits valid form
  const submitForm = () => {
    validateForm(() => mutate(formatLogFormReqBody()));
  };

  // Clears form data, resetting it to intial state
  const clearForm = () => {
    setForm(initialFormState);
  };

  // Format form body for create form request
  const formatLogFormReqBody = () => ({
    roast_number: form.roastNum,
    country: form.country as string,
    region: form.region,
    process: form.process as string,
    date: getDate(form.dateTime),
    time: getTime(form.dateTime),
    green_weight: Number(form.greenWeight),
    roasted_weight: Number(form.roastedWeight),
    first_crack: parseFloat(form.firstCrack),
    cool_down: parseFloat(form.coolDown),
    vac_to_250: form.vacCool ? 1 : 0,
  });

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
  const validateForm = (callback: VoidFunction) => {
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
      callback();
    } else {
      setCheckErrors(true);
      createSnack("All form fields are required", "error");
      setErrors(newErrors);
    }
  };

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

  // Assigns next roast number
  useEffect(() => {
    if (form?.roastNum === 0 && lastRoast)
      setForm((f) => ({ ...f, roastNum: lastRoast.roast_number + 1 }));
  }, [lastRoast, form.roastNum]);

  return {
    form,
    errors,
    clearForm,
    submitForm,
    updateForm,
    validateForm,
    loadingPostReq,
    handleImportData,
    formIsIncomplete,
    formatLogFormReqBody,
  };
};

export default useLogForm;

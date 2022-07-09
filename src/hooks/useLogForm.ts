// Imports
import useSnacks from "hooks/useSnacks";
import constants from "utils/constants";
import { IRoast } from "components/Table/types";
import { getDate, getTime } from "utils/helpers";
import useFetchLastRoast from "hooks/useFetchLastRoast";
import { useCallback, useState, useEffect } from "react";
import { createRoast, updateRoast, getRoasts } from "api/axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

// Types
export interface IFormState {
  region: string;
  coolDown: string;
  vacCool: boolean;
  firstCrack: string;
  greenWeight: string;
  process: string | null;
  country: string | null;
  roastedWeight: string;
  dateTime: Date | null;
}
export interface IReqBody {
  country: string;
  region: string;
  process: string;
  date: string;
  time: string;
  green_weight: number;
  roasted_weight: number;
  first_crack: number;
  cool_down: number;
  vac_to_250: number;
  id?: number;
}

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
const useLogForm = (closeEditWindow?: VoidFunction) => {
  // Local State
  const [checkErrors, setCheckErrors] = useState(false);
  const [form, setForm] = useState<IFormState>(initialFormState);
  const [formIsIncomplete, setFormIsIncomplete] = useState(true);
  const [errors, setErrors] = useState<IErrorState>(initialErrorState);

  // Hooks
  const { createSnack } = useSnacks();
  const queryClient = useQueryClient();
  const { roastNumber, lastRoast } = useFetchLastRoast();

  // Used to refetch roasts after patch request
  const { refetch } = useQuery(constants.reactQuery.allRoasts, getRoasts);

  // React query POST request to create new roast log
  const { mutate: mutatePost, isLoading: loadingPostReq } = useMutation(
    createRoast,
    {
      onSuccess: (data) => {
        clearForm();
        createSnack("Roast log created", "success");
      },
      onError: () => createSnack("Failed to create roast log", "error"),
      onSettled: () => queryClient.invalidateQueries("create"),
    }
  );

  // React query PATCH request to create new roast log
  const { mutate: mutatePatch, isLoading: loadingPatchReq } = useMutation(
    updateRoast,
    {
      onSuccess: (data) => {
        refetch();
        closeEditWindow && closeEditWindow();
        createSnack("Roast log updated", "success");
      },
      onError: () => createSnack("Failed to update roast log", "error"),
      onSettled: () => queryClient.invalidateQueries("update"),
    }
  );

  // Updates the form by it's key and passing a value
  const updateForm = (key: keyof typeof form) => (value: any) => {
    setForm((f) => ({ ...form, [key]: value }));
  };

  // Submits valid form
  const submitForm = () => {
    validateForm(() => mutatePost(formatLogFormReqBody()));
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

  // Handles submit for the edit form
  const handleSubmitEdit = (id: number) => {
    validateForm(() => mutatePatch(formatLogFormReqBody(id)));
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
    roastNumber,
    updateEditForm,
    loadingPostReq,
    loadingPatchReq,
    handleSubmitEdit,
    formIsIncomplete,
    handleImportData,
  };
};

export default useLogForm;

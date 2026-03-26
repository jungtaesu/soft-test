import { useState } from "react";

function useForm(rules, initialValues) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    //!value 로는 0, 빈배열, 공백 문자열 처리가 부정확하여 함수 추가

    const isEmptyValue = (value) => {
        if (typeof value === "string") return value.trim() === "";
        if (Array.isArray(value)) return value.length === 0;
        return value == null;
    };

    const getLength = (value) => {
        if (typeof value === "string" || Array.isArray(value)) {
            return value.length;
        }
        return undefined;
    };

    const validate = (name, value) => {
        const rule = rules[name];
        if (!rule) return '';

        if (rule.required && isEmptyValue(value)) return '필수 입력 항목입니다.';

        const length = getLength(value);
        if (rule.minLength && length != null && length < rule.minLength) {
            return `최소 ${rule.minLength}자 이상 입력하세요.`;
        }
        if (rule.maxLength && length != null && length > rule.maxLength) {
            return `최대 ${rule.maxLength}자까지 입력 가능합니다.`;
        }

        return '';
    };

    // const handleChange = (name, value) => {
    //     setValues({ ...values, [name]: value });
    //     const error = validate(name, value);
    //     setErrors({ ...errors, [name]: error });
    // };

    const handleChange = (name, value) => {
        // stale state 방지
        setValues((prev) => ({ ...prev, [name]: value }));
        const error = validate(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    // const handleSubmit = (onSubmit) => {
    //     return (event) => {
    //         event.preventDefault();

    //         const allErrors = {};
    //         Object.keys(rules).forEach((name) => {
    //             allErrors[name] = validate(name, values[name]);
    //         });

    //         setErrors(allErrors);

    //         if (Object.values(allErrors).every((e) => e === '')) {
    //             onSubmit(values);
    //         }
    //     };
    // };

    const handleSubmit = (onSubmit) => {
        // 이 표현식은 렌더 중에 먼저 평가됩니다.
        // 즉 React가 onSubmit prop 값을 만들기 위해 handleSubmit(onSubmit)을 즉시 호출해요.
        return (event) => {
            //제출 후 새로고침되는 브라우저의 기본 폼 동작 막기위함.
            event.preventDefault();
            const allErrors = {};
            Object.keys(rules).forEach(name => {
                allErrors[name] = validate(name, values[name]);
            });
            setErrors(allErrors);
            if (Object.values(allErrors).every(e => e === '')) {
                onSubmit(values);
            }
        }

    };

    return { values, errors, handleChange, handleSubmit };
}

export { useForm };
export default useForm;
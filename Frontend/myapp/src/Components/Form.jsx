import React from "react";

// form for adding and editing
function FormModal({
  title,
  fields,
  onClose,
  onSubmit,
  formData,
  handleChange,
  submitText = "Save",
}) {
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(15,23,42,0.45)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },

    modal: {
      width: "500px",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "35px",
      boxShadow: "0 20px 45px rgba(0,0,0,0.15)",
    },

    heading: {
      textAlign: "center",
      color: "#1e293b",
      fontSize: "28px",
      marginBottom: "30px",
      fontWeight: "700",
    },

    inputGroup: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "22px",
    },

    label: {
      marginBottom: "8px",
      fontWeight: "600",
      color: "#334155",
      fontSize: "15px",
    },

    input: {
      width: "100%",
      padding: "13px 16px",
      border: "1px solid #d1d5db",
      borderRadius: "10px",
      fontSize: "15px",
      outline: "none",
    },

    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "15px",
      marginTop: "30px",
    },

    saveButton: {
      backgroundColor: "#2563eb",
      color: "white",
      border: "none",
      padding: "12px 28px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "15px",
    },

    cancelButton: {
      backgroundColor: "#ef4444",
      color: "white",
      border: "none",
      padding: "12px 28px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "15px",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.heading}>{title}</h2>

        <form onSubmit={onSubmit}>
          {fields.map((field) => (
            <div key={field.name} style={styles.inputGroup}>
              <label style={styles.label}>{field.label}</label>

              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select {field.label}</option>

                  {field.options.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.name || option.title}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  style={styles.input}
                />
              )}
            </div>
          ))}

          <div style={styles.buttonContainer}>

          <button type="button" style={styles.cancelButton} onClick={onClose}>Cancel</button>

         <button type="submit" style={styles.saveButton}>{submitText}</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default FormModal;
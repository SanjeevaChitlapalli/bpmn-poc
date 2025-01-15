import React, { useEffect, useRef } from 'react';
import { Form } from '@bpmn-io/form-js-viewer';
import { FormEditor } from '@bpmn-io/form-js-editor';

const INITIAL_SCHEMA = {
  schemaVersion: 3,
  exporter: {
    name: 'form-js',
    version: '1.0'
  },
  type: 'default',
  components: [
    {
      type: 'textfield',
      label: 'Order Number',
      key: 'orderNumber',
      validate: {
        required: true,
        pattern: '^[A-Z]{2}\\d{6}$'
      },
      description: 'Format: XX000000 (2 letters followed by 6 digits)'
    },
    {
      type: 'textfield',
      label: 'Product Name',
      key: 'productName',
      validate: {
        required: true,
        minLength: 3
      }
    },
    {
      type: 'number',
      label: 'Quantity',
      key: 'quantity',
      validate: {
        required: true,
        min: 1
      },
      defaultValue: 1
    },
    {
      type: 'select',
      label: 'Production Line',
      key: 'productionLine',
      values: [
        { label: 'Line A - Assembly', value: 'A' },
        { label: 'Line B - Packaging', value: 'B' },
        { label: 'Line C - Testing', value: 'C' }
      ],
      validate: {
        required: true
      }
    },
    {
      type: 'datetime',
      label: 'Required Completion Date',
      key: 'completionDate',
      validate: {
        required: true
      },
      subtype: 'date'
    },
    {
      type: 'textarea',
      label: 'Special Instructions',
      key: 'instructions',
      validate: {
        maxLength: 500
      }
    },
    {
      type: 'checkbox',
      label: 'High Priority',
      key: 'priority'
    },
    {
      type: 'button',
      label: 'Submit Order',
      key: 'submit',
      action: 'submit'
    }
  ]
};


interface FormEditorComponentProps {
  className?: string;
  editable?: boolean;
}

export const FormEditorComponent: React.FC<FormEditorComponentProps> = ({ className, editable = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<Form | FormEditor | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const FormClass = editable ? FormEditor : Form;
    const form = new FormClass({
      container: containerRef.current
    });

    form.importSchema(INITIAL_SCHEMA).then(() => {
      console.log('Form schema imported successfully');
    }).catch((error) => {
      console.error('Error importing schema:', error);
    });

    form.on('submit', (event: any) => {
      console.log('Form submitted:', event.data);
      alert('Production order submitted successfully!');
    });

    formRef.current = form;

    return () => {
      form.destroy();
    };
  }, [editable]);

  return (
    <div ref={containerRef} className={className}>
      {/* Form will be rendered here */}
    </div>
  );
};

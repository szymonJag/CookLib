import { styled } from 'styled-components';
import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';
import Heading from '../../../ui/Heading';
import AddProductTable from './AddProductTable';
import ProductsCart from './ProductsCart';
import { useState, MouseEvent, useRef, useEffect } from 'react';
import { IIngredient } from '../../../interfaces/IIngredient';
import { IIngredientMeasuremenet } from '../../../interfaces/IIngredientMeasurement';
import Button, { InputFile } from '../../../ui/Button';
import Checkboxes from './TagCheckboxes';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { IAddRecipeRequest, IRecipeRequest } from '../../../interfaces/IRecipe';
import { useCreateRecipe } from '../hooks/useCreateRecipe';
import { PageSection } from '../../../ui/PageSection';
import AddStepTextArea from './AddStepTextArea';
import { useParams } from 'react-router-dom';
import { useGetRecipe } from '../../recipes/hooks/useGetRecipe';
import { mapMeasurementToId } from '../../../utils/helpers';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

const RecipeForm = styled(Form)`
  background-color: transparent;
  border: none;
  display: flex;
  gap: 5rem;
  padding: 0;
`;

const StepText = styled.span`
  font-weight: 500;
`;

const RecipeStep = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  gap: 1rem;
`;

const StyledFormRow = styled(FormRow)`
  align-self: center;
  background-color: red;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: space-between;
`;

type FormValues = IRecipeRequest;
// export type FileList = File[];

function AddRecipeForm() {
  const { recipe } = useGetRecipe();
  const { isCreating, createRecipeMt } = useCreateRecipe();
  const { register, handleSubmit, setValue } = useForm<FormValues>();
  const { recipeId } = useParams<{ recipeId?: string }>();

  const [ingredients, setIngredients] = useState<IIngredientMeasuremenet[]>([]);
  const [textAreas, setTextAreas] = useState<string[]>(['']);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [selectedImages, setSelectedImage] = useState<FileList | null>(null);
  const [editMode] = useState<boolean>(recipeId !== undefined);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editMode && recipe) {
      console.log(`recipe fetchedingredients`, recipe.ingredients);

      const fetchedIngredients: IIngredientMeasuremenet[] =
        recipe.ingredients.map((ingr) => {
          const { id, kcal, name, type } = ingr.ingredient;

          const mappedIngredient: IIngredientMeasuremenet = {
            amount: ingr.amount,
            measurementId: mapMeasurementToId(ingr.measurement),
            product: { id, kcal, name, type },
          };

          return mappedIngredient;
        });

      const preparationSteps: string[] = recipe.preparationSteps.map(
        (step) => step.description
      );

      const tags: number[] = recipe.recipeTags.map((tag) => tag.tagId);

      setIngredients(fetchedIngredients);
      setTextAreas(preparationSteps);
      setSelectedTags(tags);
      setValue('name', recipe.name);
      setValue('preparationTime', recipe.preparationTime);
      setValue('servingSize', recipe.servingSize);
    }
  }, [recipeId, recipe]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const recipe: IAddRecipeRequest = {
      authorId: 1,
      name: data.name,
      preparationTime: data.preparationTime,
      servingSize: Number(data.servingSize),
      ingredients: ingredients.map((ingredient) => {
        return {
          ingredientId: ingredient.product.id,
          amount: ingredient.amount,
          measurementTypeId: ingredient.measurementId,
        };
      }),
      preparationSteps: textAreas.map((step, index) => {
        return { id: 0, step: index + 1, description: step };
      }),
      recipeTags: selectedTags,
    };

    if (selectedImages) createRecipeMt({ recipe, images: selectedImages });
  };

  function onError(errors: FieldErrors) {
    console.log('Error:', errors);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedImage(files);
    }
  };

  const handleButtonClick = () => {
    // Trigger the file input click event
    fileInputRef.current?.click();
  };

  const handleTagCheckboxChange = (tagId: number) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tagId)) {
        return prevSelectedTags.filter((id) => id !== tagId);
      } else {
        return [...prevSelectedTags, tagId];
      }
    });
  };

  const handleAddTextArea = (e: MouseEvent) => {
    e.preventDefault();
    setTextAreas((prevTextAreas) => [...prevTextAreas, '']); // Add an empty text area
  };
  const handleRemoveTextArea = (index: number) => {
    if (textAreas.length > 1)
      setTextAreas(
        (prevTextAreas) => prevTextAreas.filter((_, i) => i !== index) // Remove the text area at the specified index
      );
  };

  const handleClearTextAreas = (e: MouseEvent) => {
    e.preventDefault();
    setTextAreas(['']);
  };

  const handleAddProduct = (ingredient: IIngredient) => {
    const newProduct: IIngredientMeasuremenet = {
      product: ingredient,
      amount: 0,
      measurementId: 0,
    };

    setIngredients((prev) =>
      ingredients.find((x) => x.product.id === ingredient.id)
        ? [...prev]
        : [...prev, newProduct]
    );
    console.log(ingredient);
  };

  function handleDeleteProduct(id: number) {
    setIngredients((prev) => prev.filter((x) => x.product.id !== id));
  }

  function handleSelectMeasurement(measurementId: number, productId: number) {
    setIngredients((prev) =>
      prev.map((x) =>
        x.product.id === productId
          ? { ...x, measurementId: measurementId }
          : { ...x }
      )
    );
  }

  const handleValueChange = (value: number, productId: number) => {
    setIngredients((prev) =>
      prev.map((x) => {
        return x.product.id === productId ? { ...x, amount: value } : { ...x };
      })
    );
  };

  return (
    <RecipeForm onSubmit={handleSubmit(onSubmit, onError)}>
      <RecipeStep>
        <Heading as='h3'>
          <StepText>Krok pierwszy </StepText>- podstawowe informacje
        </Heading>
        <PageSection orientation='column'>
          <Row>
            <FormRow label='Nazwa przepisu' orientation='vertical'>
              <Input
                type='text'
                id='name'
                {...register('name', { required: 'To pole jest wymagane' })}
              />
            </FormRow>
            <FormRow label='Czas przygotowania (min)' orientation='vertical'>
              <Input
                type='number'
                id='preparationTime'
                min='1'
                {...register('preparationTime', {
                  required: 'To pole jest wymagane',
                })}
              />
            </FormRow>
            <FormRow label='Ilość porcji' orientation='vertical'>
              <Input
                type='number'
                id='servingSize'
                min='1'
                {...register('servingSize', {
                  required: 'To pole jest wymagane',
                })}
              />
            </FormRow>
          </Row>
          <StyledFormRow orientation='horizontal'>
            <InputFile
              size='small'
              variation='primary'
              type='file'
              accept='image/*'
              maxLength={3}
              multiple={true}
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            <Button
              onClick={handleButtonClick}
              size='small'
              variation='primary'
              type='button'
            >
              Dodaj zdjęcia
            </Button>
          </StyledFormRow>
        </PageSection>
      </RecipeStep>
      <RecipeStep>
        <Heading as='h3'>
          <StepText>Krok drugi </StepText> - dodaj składniki
        </Heading>
        <PageSection>
          <AddProductTable onAddIngredient={handleAddProduct} />
          <ProductsCart
            products={ingredients}
            onValueChange={(value: number, productId: number) =>
              handleValueChange(value, productId)
            }
            onDeleteButton={handleDeleteProduct}
            onSelectButton={handleSelectMeasurement}
          />
        </PageSection>
      </RecipeStep>
      <RecipeStep>
        <Heading as='h3'>
          <StepText>Krok trzeci </StepText> - dodaj kroki przygotowania
        </Heading>

        <PageSection orientation='column'>
          <Buttons>
            <Button
              variation={'danger'}
              disabled={textAreas.length === 1}
              onClick={(e: MouseEvent) => handleClearTextAreas(e)}
            >
              Wyczyść
            </Button>
            <Button onClick={(e: MouseEvent) => handleAddTextArea(e)}>
              Dodaj krok
            </Button>
          </Buttons>
          {textAreas.map((text, index) => (
            <AddStepTextArea
              key={index}
              value={text}
              onChange={(newValue) => {
                const newTextAreas = [...textAreas];
                newTextAreas[index] = newValue;
                setTextAreas(newTextAreas);
              }}
              index={index}
              handleRemove={handleRemoveTextArea}
            />
          ))}
        </PageSection>
      </RecipeStep>
      <RecipeStep>
        <Heading as='h3'>
          <StepText>Krok czwarty </StepText> - dodaj tagi
        </Heading>
        <PageSection>
          <Checkboxes
            selectedTags={selectedTags}
            onTagCheckboxChange={handleTagCheckboxChange}
          />
        </PageSection>
      </RecipeStep>
      <Button type='submit' disabled={isCreating}>
        Dodaj kurwa przepisisko
      </Button>
    </RecipeForm>
  );
}

export default AddRecipeForm;

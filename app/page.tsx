'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Scale,
  Wheat,
  Droplets,
  Salad as Salt,
  Calculator,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';
import Image from 'next/image';

interface CalculatedRecipe {
  flour: number;
  water: number;
  salt: number;
  levain: number;
}

export default function Home() {
  const [doughWeight, setDoughWeight] = useState<number>(1000);
  const [prefermentedFlour, setPrefermentedFlour] = useState<number>(60);
  const [levainPercentage, setLevainPercentage] = useState<number>(20);
  const [scale, setScale] = useState<number>(1.0);
  const [hydration, setHydration] = useState<number>(66);
  const [recipe, setRecipe] = useState<CalculatedRecipe | null>(null);

  const calculateRecipe = () => {
    const hydrationDecimal = hydration / 100;
    const levainDecimal = levainPercentage / 100;

    const totalFlourBase = doughWeight / (1 + hydrationDecimal + 0.02);
    const totalFlour = totalFlourBase * scale;

    const water = totalFlour * hydrationDecimal;
    const salt = totalFlour * 0.02;
    const levain = totalFlour * levainDecimal;

    window.setRecipe({
      flour: Math.round(totalFlour),
      water: Math.round(water),
      salt: Math.round(salt),
      levain: Math.round(levain),
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <Image
              src="/bread-illustration.png"
              alt="Sourdough Bread Illustration"
              width={300}
              height={225}
              priority
              className="rounded-lg"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-center">
            Sourdough Calculator
          </h1>
          <p className="text-muted-foreground text-center">
            Calculate the perfect sourdough recipe based on baker&apos;s
            percentages
          </p>
        </div>

        <Card className="p-4 sm:p-6">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dough-weight">
                  <Scale className="w-4 h-4 inline mr-2" />
                  Dough Weight (g)
                </Label>
                <Input
                  id="dough-weight"
                  type="number"
                  value={doughWeight}
                  onChange={(e) => setDoughWeight(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prefermented-flour">
                  <Wheat className="w-4 h-4 inline mr-2" />
                  Pre-fermented Flour (g)
                </Label>
                <Input
                  id="prefermented-flour"
                  type="number"
                  value={prefermentedFlour}
                  onChange={(e) => setPrefermentedFlour(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="levain">
                  <Wheat className="w-4 h-4 inline mr-2" />
                  Levain (%)
                </Label>
                <Input
                  id="levain"
                  type="number"
                  value={levainPercentage}
                  onChange={(e) => setLevainPercentage(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hydration">
                  <Droplets className="w-4 h-4 inline mr-2" />
                  Hydration (%)
                </Label>
                <Input
                  id="hydration"
                  type="number"
                  value={hydration}
                  onChange={(e) => setHydration(Number(e.target.value))}
                />
              </div>
            </div>

            <Button onClick={calculateRecipe} className="w-full">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Recipe
            </Button>

            {recipe && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Recipe Results</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Strong White Flour
                    </p>
                    <p className="text-xl sm:text-2xl font-bold">
                      {recipe.flour}g
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Water</p>
                    <p className="text-xl sm:text-2xl font-bold">
                      {recipe.water}g
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Salt</p>
                    <p className="text-xl sm:text-2xl font-bold">
                      {recipe.salt}g
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Levain</p>
                    <p className="text-xl sm:text-2xl font-bold">
                      {recipe.levain}g
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <Tabs defaultValue="guide" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="guide">
                <BookOpen className="w-4 h-4 mr-2" />
                Baking Guide
              </TabsTrigger>
              <TabsTrigger value="troubleshooting">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Troubleshooting
              </TabsTrigger>
            </TabsList>

            <TabsContent value="guide" className="space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">
                  Sourdough Baking Guide
                </h2>
                <p className="text-muted-foreground">
                  Follow this guide to create delicious sourdough bread using
                  your calculated recipe. Every kitchen and every oven are
                  different, don't be discouraged if this doesn't work for you
                  on the first try!
                </p>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">
                  1. Prepare Your Starter
                </h3>
                <p className="mb-4">
                  Ensure your sourdough starter is active and healthy. Feed it
                  12-24 hours before making your levain. A healthy starter
                  should:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Double in size within 4-8 hours after feeding</li>
                  <li>Have a pleasant, slightly sour aroma</li>
                  <li>Show plenty of bubbles throughout</li>
                  <li>Pass the float test in water</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">
                  2. Autolyse (Optional, but helps)
                </h3>
                <p className="mb-4">
                  Mix flour and water (hold back some water for adjustments),
                  and let rest for 30 minutes to 4 hours. This develops gluten
                  and makes the dough easier to work with.
                </p>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">
                  3. Bulk Fermentation
                </h3>
                <p className="mb-4">
                  After mixing in levain and salt, let the dough ferment for 4-6
                  hours at room temperature (68-72°F). Perform stretch and folds
                  every 30 minutes for the first 2 hours.
                </p>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">4. Shaping</h3>
                <p className="mb-4">
                  Pre-shape the dough and let rest for 20-30 minutes. Final
                  shape and place in a banneton or proofing basket.
                </p>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">5. Final Proof</h3>
                <p className="mb-4">
                  Either proof at room temperature for 2-4 hours or cold proof
                  in the refrigerator for 8-16 hours.
                </p>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">6. Baking</h3>
                <p className="mb-4">
                  Preheat oven to 500°F (260°C) with Dutch oven inside. Score
                  dough and bake covered for 20 minutes, then uncovered at 450°F
                  (230°C) for 20-25 minutes until golden brown.
                </p>
              </section>
            </TabsContent>

            <TabsContent value="troubleshooting" className="space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">
                  Troubleshooting Guide
                </h2>
                <p className="text-muted-foreground mb-6">
                  Common issues and solutions for sourdough baking. Content
                  adapted from{' '}
                  <a
                    href="https://www.the-sourdough-framework.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    The Sourdough Framework
                  </a>
                  .
                </p>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">Starter Issues</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">
                      Starter Not Doubling in Size
                    </h4>
                    <p className="text-muted-foreground">
                      The doubling metric varies based on flour type. Rye flour
                      retains less gas, while wheat flour with less gluten won't
                      rise as much. Develop your own volume increase metric and
                      use the starter just before it collapses. Consider smell
                      as an indicator - stronger smell means further
                      fermentation.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">
                      Best Starter Feeding Ratio
                    </h4>
                    <p className="text-muted-foreground">
                      For a new starter use either 1:5:5 or 1:10:10
                      (starter:flour:water). For stiff starters, use half the
                      water (1:5:2.5). Use 1:10:10 for older, unfed starters to
                      provide a cleaner environment for microorganism growth.
                    </p>
                    <p className="text-muted-foreground">
                      For maintaining an active starter feed a 1:2:2 ratio
                      daily.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">New Starter Not Rising</h4>
                    <p className="text-muted-foreground">
                      Ensure you're using unchlorinated water and whole grain
                      flour. Chlorinated water kills microorganisms, and whole
                      grain flour contains more natural wild yeast. Consider
                      using organic unbleached flour, as industrial flour may
                      contain fungicides.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">Dough Problems</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Flat Bread</h4>
                    <p className="text-muted-foreground">
                      Usually related to gluten network breakdown. Consider
                      using a stiff sourdough starter to boost yeast activity,
                      or use stronger flour with more gluten. Daily starter
                      feedings at 1:5:5 ratio can help achieve better
                      yeast/bacteria balance.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Dough Too Sticky</h4>
                    <p className="text-muted-foreground">
                      Often indicates over-fermentation. If this occurs during
                      shaping, consider using a greased loaf pan. For future
                      batches, reduce fermentation time or use less starter to
                      slow fermentation.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Optimal Hydration</h4>
                    <p className="text-muted-foreground">
                      For beginners, start with 60% hydration (60g water per
                      100g flour). This makes handling easier and works for most
                      flour types. Suitable for bread, buns, pizzas, and
                      baguettes.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h3 className="text-xl font-semibold mb-3">
                  Crust and Crumb Issues
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Chewy Crust</h4>
                    <p className="text-muted-foreground">
                      Common after a day or in humid conditions. For storage,
                      keep bread in a plastic bag in the fridge and toast slices
                      before eating to restore crispness.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Dense Crumb</h4>
                    <p className="text-muted-foreground">
                      Could indicate under-fermentation. Aim for 8-12 hours bulk
                      fermentation. Make starter more active through daily
                      feedings using a 1:5:5 ratio. Consider using a stiff
                      starter for better yeast activity.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Low Gluten Content</h4>
                    <p className="text-muted-foreground">
                      Add approximately 5g of vital wheat gluten for every 100g
                      of flour to improve structure and rise.
                    </p>
                  </div>
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

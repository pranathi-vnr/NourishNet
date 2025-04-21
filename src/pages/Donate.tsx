
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { usePantries } from "@/hooks/usePantries";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const Donate = () => {
  const { data: pantries = [] } = usePantries();
  const [selectedPantry, setSelectedPantry] = useState("");
  const [amount, setAmount] = useState("");
  
  return (
    <Layout>
      <div className="bg-gradient-to-b from-nourish-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Donate to a Food Pantry</h1>
            <p className="text-lg text-gray-600">
              Your generous donation helps provide essential food items to those in need.
              Choose a pantry to support and make a difference today.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Make a Donation</CardTitle>
                <CardDescription>Support a local food pantry with a donation.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pantry">Select a Pantry</Label>
                  <Select value={selectedPantry} onValueChange={setSelectedPantry}>
                    <SelectTrigger id="pantry">
                      <SelectValue placeholder="Select a pantry" />
                    </SelectTrigger>
                    <SelectContent>
                      {pantries.map((pantry) => (
                        <SelectItem key={pantry.id} value={pantry.id}>{pantry.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Donation Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input 
                      id="amount" 
                      type="number" 
                      placeholder="25.00" 
                      className="pl-8" 
                      value={amount} 
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-nourish-600 hover:bg-nourish-700" disabled={!selectedPantry || !amount}>
                  Complete Donation
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Other Ways to Help</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Volunteer Your Time</h3>
              <p className="text-gray-600 mb-4">Help sort donations, pack food boxes, or assist with distribution.</p>
              <Button variant="outline" className="border-nourish-600 text-nourish-600">Learn More</Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Donate Food Items</h3>
              <p className="text-gray-600 mb-4">Contribute non-perishable food items directly to local pantries.</p>
              <Button variant="outline" className="border-nourish-600 text-nourish-600">See Needed Items</Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Host a Food Drive</h3>
              <p className="text-gray-600 mb-4">Organize a collection in your community, workplace, or school.</p>
              <Button variant="outline" className="border-nourish-600 text-nourish-600">Get Started</Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Donate;

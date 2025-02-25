'use client';

import { Button } from "@/components/atoms/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/molecules/card";

export default function TestPage() {

  return (
    <div className="min-h-screen p-4 bg-blue-300">
      <div className="container mx-auto flex justify-center items-center min-h-screen">
            <Card variant="default" className="w-full max-w-2xl pt-4">

                <CardHeader>
                    <CardDescription>سؤال 1 من 5</CardDescription>
                    <CardTitle>اختبار تحديد المستوى</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="space-y-6">
                        <div className="text-right">
                        <h2 className="text-lg font-tajawal font-medium mb-4">ما هي المادة التي لا تختلط مع المياه؟</h2>
                            <div className="space-y-3">
                                <div className="flex items-center justify-end gap-2 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                                    <label className="w-full text-right cursor-pointer font-ibm font-regular">الزيت</label>
                                    <input type="radio" name="answer" className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>    
                </CardContent>

                <CardFooter>
                    <div className="flex justify-end pt-4">
                        <Button 
                            variant="default"
                            className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white px-4 sm:px-8 py-2 font-pingar font-medium text-sm sm:text-base"
                        >
                            التالي ← 
                        </Button>
                    </div>
                </CardFooter>
            </Card>
      </div>
    </div>
  );
}
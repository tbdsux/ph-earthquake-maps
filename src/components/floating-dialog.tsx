import { useFDSettings } from "@/hooks/use-fd-settings";
import { Label } from "@radix-ui/react-label";
import { XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function FloatingDialog() {
  const date = useFDSettings((state) => state.date);
  const setDate = useFDSettings((state) => state.setDate);

  return (
    <div className="absolute top-8 right-8 z-[99999]">
      <Card className="">
        <CardHeader>
          <CardTitle>PHIVOLCS Earthquake Data Viewer</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            <div className=" flex items-center justify-between">
              <Label htmlFor="calendar">Date</Label>

              {date ? (
                <Button
                  onClick={() => setDate(undefined)}
                  className="text-sm h-auto p-1 px-2"
                >
                  <XIcon />
                  Clear
                </Button>
              ) : null}
            </div>

            <Calendar
              id="calendar"
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disableNavigation
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

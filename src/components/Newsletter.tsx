import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react"
import Logo from "./Logo"

export function Newsletter() {
  return (<div
      key="1"
      className="flex flex-col items-center justify-center xl:min-h-screen p-3 sm:px-6 lg:px-8 bg-gray-200"
    >
      <div className="w-full max-w-[900px] space-y-6 bg-white shadow-lg rounded-lg p-6">
        <div className="space-y-2 justify-center flex items-center text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Subscribe to our Newsletter
          </h1>
        </div>

        <div className="space-y-4">
          <form onSubmit={() => {}} className="space-y-6">
            <div className="space-y-2">
              <div className="grid grid-cols-1 xl:pl-[30%] xl:pr-[30%]">
                <div className="space-y-2">
                  <div className="w-full flex flex-col gap-4">
                    <div
                      key="md"
                      className="flex w-full flex-wrap flex-nowrap mb-6 mb-0 gap-4"
                    >
                      <Input
                        onChange={(e) => {}}
                        size="md"
                        type="text"
                        label="Name"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full flex flex-col gap-4">
                    <div
                      key="md"
                      className="flex w-full flex-wrap flex-nowrap mb-6 mb-0 gap-4"
                    >
                      <Input
                        onChange={(e) =>{}}
                        size="md"
                        type="text"
                        label="Email Id"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full flex flex-col gap-4">
                    <div
                      key="md"
                      className="flex w-full flex-wrap flex-nowrap mb-6 mb-0 gap-4"
                    >
                      <Input
                        onChange={(e) =>{}}
                        size="md"
                        type="number"
                        label="Mobile No"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full flex flex-col gap-4">
                    <div
                      key="md"
                      className="flex w-full flex-wrap flex-nowrap mb-6 mb-0 gap-4"
                    >
                      <Textarea
                        label="Message"
                        placeholder="Enter your description"
                      />
                    </div>
                  </div>
                </div>
              <Button
                // onClick={handleSubmit}

                className="w-full bg-black text-white"
              >
                Save
              </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

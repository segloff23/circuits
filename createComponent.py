import sys
import os

def getCssName(name):
  newName = name[0].lower()
  for c in name[1:]:
    if c.islower():
      newName += c
    else:
      newName += "-" + c.lower()
  return newName

if len(sys.argv) <= 1:
  print("Error: no component name provided")
  exit()

name = sys.argv[1]
cssName = getCssName(name)
targetDir = os.getcwd() + "\\src\\components\\" + name

if os.path.exists(targetDir):
  print("Error: filepath with same name exists")
  exit()
else:
  os.mkdir(targetDir)
  os.chdir(targetDir)
  
  with open(name + ".jsx", "w") as f:
    f.write("import './" + cssName + ".scss'\n\n")
    f.write("const " + name + " = () => {\n")
    f.write("  return <div>Hello World</div>;\n")
    f.write("};\n\n")
    f.write("export default " + name + ";\n")
  
  with open("index.jsx", "w") as f:
    f.write("import " + name + " from './" + name + "';\n\n")
    f.write("export default " + name + ";\n")

  with open(cssName + ".scss", "w") as f:
    f.write("@import 'constants/variables.scss';\n")
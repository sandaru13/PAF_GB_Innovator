package com;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap; 
import java.util.Map; 
import java.util.Scanner;


@WebServlet("/InnovatorAPI")
public class InnovatorAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	Innovator innvObj = new Innovator(); 
	
    public InnovatorAPI() {
        super();
        
    }

	
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
			String output = innvObj.insertInnvProjects(request.getParameter("campTitle"), 
				request.getParameter("category"), 
				request.getParameter("projectDetails"), 
				request.getParameter("manage"), 
				request.getParameter("minGoal"), 
				request.getParameter("inReward"), 
				request.getParameter("deadLine")); 
				
			response.getWriter().write(output); 
	}

	
	private static Map getParasMap(HttpServletRequest request) 
	{ 
	 Map<String, String> map = new HashMap<String, String>(); 
		try
		 { 
		 Scanner scanner = new Scanner(request.getInputStream(), "UTF-8"); 
		 String queryString = scanner.hasNext() ? 
		 scanner.useDelimiter("\\A").next() : ""; 
		 scanner.close(); 
		 String[] params = queryString.split("&"); 
		 	for (String param : params) 
			 {
				 String[] p = param.split("=");
				 map.put(p[0], p[1]);
			 
			 }
		 } 
	
		catch (Exception e) 
		 { 
		 } 
		
	return map; 
	}
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Map paras = getParasMap(request); 
		 
		String output = innvObj.updateInnvDet(paras.get("campTitle").toString(), 
		paras.get("category").toString(), 
		paras.get("projectDetails").toString(), 
		paras.get("manage").toString(),
		paras.get("inReward").toString(),
		paras.get("minGoal").toString(),
		paras.get("deadLine").toString(),
		paras.get("hidItemIDSave").toString()); 
		
		response.getWriter().write(output);
		
	}

	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Map paras = getParasMap(request); 
		
		String output = innvObj.deleteInnv(paras.get("itemID").toString()); 
		
		response.getWriter().write(output);
		
	}

}
